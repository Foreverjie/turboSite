package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"jie1203.com/goBack/api/resthandlers"
	"jie1203.com/goBack/api/routes"
	"jie1203.com/goBack/pb"

	"github.com/gorilla/mux"
	"google.golang.org/grpc"
)

var (
	port     int
	authAddr string
)

func init() {
	flag.IntVar(&port, "port", 9000, "api service port")
	flag.StringVar(&authAddr, "auth_addr", "localhost:9001", "authentication service address")
	flag.Parse()
}

func main() {

	conn, err := grpc.Dial(authAddr, grpc.WithInsecure())
	if err != nil {
		log.Panicln(err)
	}
	defer conn.Close()

	authSvcClient := pb.NewAuthServiceClient(conn)
	authHandlers := resthandlers.NewAuthHandlers(authSvcClient)
	authRoutes := routes.NewAuthRoutes(authHandlers)

	router := mux.NewRouter().StrictSlash(true)
	routes.Install(router, authRoutes)

	log.Printf("API service running on [::]:%d\n", port)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), routes.WithCORS(router)))
}
