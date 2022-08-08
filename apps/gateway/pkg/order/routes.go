package order

import (
	"github.com/foreverjie/gateway/pkg/auth"
	"github.com/foreverjie/gateway/pkg/config"
	"github.com/foreverjie/gateway/pkg/order/routes"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine, c *config.Config, authSvc *auth.ServiceClient) {
    a := auth.InitAuthMiddleware(authSvc)

    svc := &ServiceClient{
        Client: InitServiceClient(c),
    }

    routes := r.Group("/order")
    routes.Use(a.AuthRequired)
    routes.POST("/", svc.CreateOrder)
}

func (svc *ServiceClient) CreateOrder(ctx *gin.Context) {
    routes.CreateOrder(ctx, svc.Client)
}