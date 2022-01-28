package login

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"log"
	"time"
)

type Token struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// generate token
func SignJwt(userName string)(string, error){
	key := []byte("maple")
	expiration := time.Hour * 2
	c := Token{
		userName, // 自定义字段
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(expiration).Unix(),
			Issuer:    "maple",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	return token.SignedString(key)
}

// parse token
func ParseToken(tokenStr string) (*Token, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Token{}, func(token *jwt.Token) (i interface{}, err error) {
		return []byte("maple"), nil
	})
	if err != nil {
		log.Print("error")
		return nil, err
	}
	if claims, ok := token.Claims.(*Token); ok && token.Valid {
		return claims, nil
	}
	log.Print("error 2")
	return nil, errors.New("invalid token")
}
