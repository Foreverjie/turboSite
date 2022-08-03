package db

import (
	"fmt"
	"log"
	"os"
	"strconv"
)

type Config interface {
	Dsn() string
	DbName() string
}

type config struct {
	dbUser string
	dbPass string
	dbHost string
	dbPort int
	dbName string
	dsn    string
}

func NewConfig() Config {
	var cfg config
	cfg.dbUser = os.Getenv("MONGODB_USER")
	cfg.dbPass = os.Getenv("MONGODB_PASS")
	cfg.dbHost = os.Getenv("MONGODB_HOST")
	cfg.dbName = os.Getenv("MONGODB_NAME")
	var err error
	cfg.dbPort, err = strconv.Atoi(os.Getenv("MONGODB_PORT"))
	if err != nil {
		log.Fatalln("Error on load env var:", err.Error())
	}
	cfg.dsn = fmt.Sprintf("mongodb://%s:%s@%s:%d/%s?authSource=admin", cfg.dbUser, cfg.dbPass, cfg.dbHost, cfg.dbPort, cfg.dbName)
	return &cfg
}

func (c *config) Dsn() string {
	return c.dsn
}

func (c *config) DbName() string {
	return c.dbName
}