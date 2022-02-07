package login

import (
	"back/global"
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strings"
)

func AesDecryptCBC(encrypted []byte) (decrypted []byte) {
	key := []byte(strings.Repeat("maple", 3) + "m")
	block, err := aes.NewCipher(key)
	if err != nil {
		log.Print("create newCipher error")
	}
	blockModel := cipher.NewCBCDecrypter(block, key)
	plantText := make([]byte, len(encrypted))
	blockModel.CryptBlocks(plantText, encrypted)
	plantText = PKCS7UnPadding(plantText)
	return plantText
}

func PKCS7UnPadding(plantText []byte) []byte {
	length := len(plantText)
	unpadding := int(plantText[length-1])
	return plantText[:(length - unpadding)]
}

func checkInfo(userName string, pwd string) bool{
	user := global.GUserRepo.SelectOne(userName)
	if user.PassWord == pwd {
		return true
	}else{
		return false
	}
}

var RLoginHandler gin.HandlerFunc = func(c *gin.Context) {
	userName := c.PostForm("userName")
	decodedByHex,err := hex.DecodeString(c.PostForm("pwd"))
	if err != nil{
		log.Print("hex decode error")
	}
	pwd := string(AesDecryptCBC(decodedByHex))
	//sign token
	if checkInfo(userName, pwd) == true{
		token, err:= SignJwt(userName)
		if err != nil{
			log.Print("sign jwt error")
		}
		http.SetCookie(c.Writer, &http.Cookie{
			Name: "token",
			Value: token,
			Path: "/",
			Domain: "127.0.0.1",
			MaxAge: 7200,
			Secure: false,
			HttpOnly: false,
		})
		c.JSON(http.StatusOK, gin.H{
			"code": 1,
			"data":gin.H{
				"userName": userName,
			},
		})
	}else{
		c.JSON(http.StatusOK, gin.H{
			"code": -1,
			"data":gin.H{},
		})
	}
}

