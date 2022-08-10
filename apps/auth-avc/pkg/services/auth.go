package services

import (
	"context"
	"net/http"

	"github.com/foreverjie/auth-svc/pkg/db"
	"github.com/foreverjie/auth-svc/pkg/models"
	"github.com/foreverjie/auth-svc/pkg/pb"
	"github.com/foreverjie/auth-svc/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Server struct {
    H   *mongo.Client
    Jwt utils.JwtWrapper
}

// var userCollection *mongo.Collection = db.GetCollection(db.DB, "users")


func (s *Server) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterResponse, error) {
    var user models.User
    var userCollection *mongo.Collection = db.GetCollection(s.H, "users")
    count, err := userCollection.CountDocuments(ctx, bson.M{"email": req.Email})
    if err != nil {
        return &pb.RegisterResponse{
            Status: http.StatusConflict,
            Error:  "E-Mail Check Error",
        }, nil
    }
    if count > 0 {
        return &pb.RegisterResponse{
            Status: http.StatusConflict,
            Error:  "E-Mail already exists",
        }, nil
    }

    // count, err = userCollection.CountDocuments(ctx, bson.M{"phone": req.Phone})
    // if err != nil {
    //     return &pb.RegisterResponse{
    //         Status: http.StatusConflict,
    //         Error:  "Phone already exists",
    //     }, nil
    // }

    user.Email = req.Email
    user.Password = utils.HashPassword(req.Password)

    userCollection.InsertOne(ctx, user)

    return &pb.RegisterResponse{
        Status: http.StatusCreated,
    }, nil
}

func (s *Server) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
    var user models.User
    var userCollection *mongo.Collection = db.GetCollection(s.H, "users")

    err := userCollection.FindOne(ctx, bson.M{"email": req.Email}).Decode(&user)
    if err != nil {
        return &pb.LoginResponse{
            Status: http.StatusNotFound,
            Error:  "User not found",
        }, nil
    }

    match := utils.CheckPasswordHash(req.Password, user.Password)

    if !match {
        return &pb.LoginResponse{
            Status: http.StatusNotFound,
            Error:  "Account or Password is incorrect",
        }, nil
    }

    token, _ := s.Jwt.GenerateToken(user)

    return &pb.LoginResponse{
        Status: http.StatusOK,
        Token:  token,
    }, nil
}

func (s *Server) Validate(ctx context.Context, req *pb.ValidateRequest) (*pb.ValidateResponse, error) {
    claims, err := s.Jwt.ValidateToken(req.Token)
    var userCollection *mongo.Collection = db.GetCollection(s.H, "users")

    if err != nil {
        return &pb.ValidateResponse{
            Status: http.StatusBadRequest,
            Error:  err.Error(),
        }, nil
    }

    var user models.User

    err = userCollection.FindOne(ctx, bson.M{"email": claims.Email}).Decode(&user)

    if err != nil {
        return &pb.ValidateResponse{
            Status: http.StatusNotFound,
            Error:  "User not found",
        }, nil
    }

    return &pb.ValidateResponse{
        Status: http.StatusOK,
        UserId: user.Id,
    }, nil
}