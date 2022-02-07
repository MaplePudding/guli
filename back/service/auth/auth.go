package auth

import (
	"back/service/login"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

var RAuthHandler gin.HandlerFunc = func(c *gin.Context){
	tokenStr, cookieErr := c.Cookie("token")
	if cookieErr != nil{
		log.Print("Get token error")
	}
	token, parseErr := login.ParseToken(tokenStr)
	if parseErr != nil{
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
		})
	}else{
		c.JSON(http.StatusOK, gin.H{
			"code": 1,
			"data":gin.H{
				"userName": token.Username,
			},
		})
	}
}