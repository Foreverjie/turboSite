package main

import (
	"log"

	"github.com/foreverjie/gateway/pkg/auth"
	"github.com/foreverjie/gateway/pkg/config"
	"github.com/foreverjie/gateway/pkg/order"
	"github.com/foreverjie/gateway/pkg/product"
	"github.com/gin-gonic/gin"
)

func main() {
    c, err := config.LoadConfig()

    if err != nil {
        log.Fatalln("Failed at config", err)
    }

    r := gin.Default()

    authSvc := *auth.RegisterRoutes(r, &c)
    product.RegisterRoutes(r, &c, &authSvc)
    order.RegisterRoutes(r, &c, &authSvc)

    r.Run(c.Port)
}

// https://levelup.gitconnected.com/microservices-with-go-grpc-api-gateway-and-authentication-part-1-2-393ad9fc9d30