package db

import (
	"context"
	"fmt"
	"log"
	"time"

	// "github.com/foreverjie/auth-svc/pkg/models"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


func Init(url string) *mongo.Client {
    client, err := mongo.NewClient(options.Client().ApplyURI(url))
    if err != nil {
        log.Fatal(err)
    }
  
    ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
    err = client.Connect(ctx)
    if err != nil {
        log.Fatal(err)
    }

    //ping the database
    err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Connected to MongoDB")
    return client
}

//Client instance
// var DB *mongo.Client = Init('mongodb://jie:zzj1234@localhost:27017/turboBack?authSource=admin')

//getting database collections
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
    collection := client.Database("golangAPI").Collection(collectionName)
    return collection
}