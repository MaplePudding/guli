package main

import (
	"back/global"
	"back/repository"
	"back/service/auth"
	"back/service/login"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"time"
)

func UserRepoRegister(){
	userRepo := new(repository.UserRepo)
	userRepo.Db = repository.NewUserDb()
	global.GUserRepo = userRepo
	fmt.Sprintf("registe user repo")
}

func main(){
	app := gin.Default()

	// registe userRepo globally
	UserRepoRegister()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:3000", "http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "OPTIONS", "POST", "GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://127.0.0.1:3000"
		},
		MaxAge: 12 * time.Hour,
	}))

	defaultGroup := app.Group("/default")
	{
		defaultGroup.POST("/login", login.RLoginHandler)
		defaultGroup.POST("/auth", auth.RAuthHandler)
	}

	authGroup := app.Group("/auth")
	{
		log.Printf("%v", authGroup)
	}


	app.Run(":8080")

}
