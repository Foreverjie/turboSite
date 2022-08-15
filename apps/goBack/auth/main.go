package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"net"
	"os"

	"github.com/foreverjie/turboSite/apps/goBack/db"
	authPb "github.com/foreverjie/turboSite/apps/goBack/proto/auth"
	"github.com/foreverjie/turboSite/apps/goBack/server"

	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
)

var (
	local bool
	port  int
)

func init() {
	flag.IntVar(&port, "port", 9001, "authentication service port")
	flag.BoolVar(&local, "local", true, "run authentication service local")
	flag.Parse()
}

func main() {
	log := grpclog.NewLoggerV2(os.Stdout, ioutil.Discard, ioutil.Discard)
	grpclog.SetLoggerV2(log)

	if local {
		err := godotenv.Load()
		if err != nil {
			log.Info(err)
		}
	}

	cfg := db.NewConfig()
	conn, err := db.NewConnection(cfg)
	if err != nil {
		log.Info(err)
	}
	defer conn.Close()

	// usersRepository := repository.NewUsersRepository(conn)
	// authService := service.NewAuthService(usersRepository)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Info("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()

	authPb.RegisterAuthServiceServer(grpcServer, server.New())

	log.Info("Authentication service running on tcp [::]:%d\n", port)

	grpcServer.Serve(lis)
}
