package auth

import (
	"back/service/login"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

var RAuthHandler gin.HandlerFunc = func(c *gin.Context){
	log.Print("Hello World")
	tokenStr, cookieErr := c.Cookie("token")
	if cookieErr != nil{
		log.Print("Get token error")
	}
	_, parseErr := login.ParseToken(tokenStr)
	if parseErr != nil{
		c.JSON(http.StatusOK, gin.H{
			"value": -1,
		})
	}else{
		c.JSON(http.StatusOK, gin.H{
			"value": 1,
		})
	}
}