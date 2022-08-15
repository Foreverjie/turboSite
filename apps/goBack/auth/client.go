package auth

import (
	"fmt"

	"github.com/foreverjie/turboSite/apps/goBack/config"
	pb "github.com/foreverjie/turboSite/apps/goBack/proto/auth"
	"google.golang.org/grpc"
)

type ServiceClient struct {
    Client pb.AuthServiceClient
}

func InitServiceClient(c *config.Config) pb.AuthServiceClient {
    // using WithInsecure() because no SSL running
    cc, err := grpc.Dial(c.AuthSvcUrl, grpc.WithInsecure())

    if err != nil {
        fmt.Println("Could not connect:", err)
    }

    return pb.NewAuthServiceClient(cc)
}