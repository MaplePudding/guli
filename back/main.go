package main

import (
	"back/global"
	"back/repository"
	"back/service/auth"
	"back/service/category"
	"back/service/login"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

func registeRepository(){
	db := repository.NewDb()
	userRepo := new(repository.UserRepo)
	categoryRepo := new(repository.CategoryRepo)
	userRepo.Db = db
	categoryRepo.Db = db
	global.GUserRepo = userRepo
	global.GCategoryRepo = categoryRepo
}

func main(){
	app := gin.Default()

	// registe all repo globally
	registeRepository()

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
		authGroup.GET("/manage/category/list", category.RCategoriesHandler)
		authGroup.POST("/manage/category/add", category.RAddCategoryHandler)
		authGroup.POST("/manage/category/update", category.RUpdateCategoryHandler)
	}

	app.Run(":8080")
}
