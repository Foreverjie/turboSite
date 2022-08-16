package auth

import (
	"fmt"

	"github.com/foreverjie/gateway/pkg/auth/pb"
	"github.com/foreverjie/gateway/pkg/config"
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