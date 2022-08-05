package main

import (
	"context"
	"flag"
	"io"
	"io/fs"
	"mime"
	"net/http"
	"os"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"

	authPb "github.com/foreverjie/turboSite/apps/goBack/proto/auth"
	"github.com/foreverjie/turboSite/apps/goBack/third_party"
)

var (
	port     int
	authAddr string
)

// getOpenAPIHandler serves an OpenAPI UI.
// Adapted from https://github.com/philips/grpc-gateway-example/blob/a269bcb5931ca92be0ceae6130ac27ae89582ecc/cmd/serve.go#L63
func getOpenAPIHandler() http.Handler {
	mime.AddExtensionType(".svg", "image/svg+xml")
	// Use subdirectory in embedded files
	subFS, err := fs.Sub(third_party.OpenAPI, "OpenAPI")
	if err != nil {
		panic("couldn't create sub filesystem: " + err.Error())
	}
	return http.FileServer(http.FS(subFS))
}

func init() {
	flag.IntVar(&port, "port", 9000, "api service port")
	flag.StringVar(&authAddr, "auth_addr", "localhost:9001", "authentication service address")
	flag.Parse()
}

func main() {

	log := grpclog.NewLoggerV2(os.Stdout, io.Discard, io.Discard)
	grpclog.SetLoggerV2(log)

	conn, err := grpc.DialContext(context.Background(), authAddr, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Error(err)
	}
	defer conn.Close()

	gwmux := runtime.NewServeMux()
	err = authPb.RegisterAuthServiceHandler(context.Background(), gwmux, conn)
	if err != nil {
		log.Error("failed to register gateway: %w", err)
	}

	// authSvcClient := pb.NewAuthServiceClient(conn)
	// authHandlers := resthandlers.NewAuthHandlers(authSvcClient)
	// authRoutes := routes.NewAuthRoutes(authHandlers)

	// router := mux.NewRouter().StrictSlash(true)
	// routes.Install(router, authRoutes)

	log.Info("API service running on [::]:%d\n", port)

	// log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), routes.WithCORS(router)))
}
