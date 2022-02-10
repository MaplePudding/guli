package product

import (
	"back/global"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

func RProductListHandler(c *gin.Context){
	var pageNum, err1 = strconv.Atoi(c.Query("pageNum"))
	var pageSize, err2 = strconv.Atoi(c.Query("pageSize"))
	if err1 != nil{
		log.Print("String to number error")
	}
	if err2 != nil{
		log.Print("String to number error")
	}
	begin := pageNum * pageSize - pageSize

	products := global.GProductRepo.SelectProductByPage(pageSize, begin)
	total := int(global.GProductRepo.GetTotal()[0])
	c.JSON(http.StatusOK, gin.H{
		"code": 1,
		"data":gin.H{
			"pageNum":pageNum,
			"total":total,
			"pageSize": 5,
			"list":products,
		},
	})
}

func RProductListConditionHandler(c *gin.Context){
	var pageNum, err1 = strconv.Atoi(c.Query("pageNum"))
	var pageSize, err2 = strconv.Atoi(c.Query("pageSize"))
	flag := c.Query("flag")
	condition := c.Query("condition")
	if err1 != nil{
		log.Print("String to number error")
	}
	if err2 != nil{
		log.Print("String to number error")
	}
	begin := pageNum * pageSize - pageSize

	products := global.GProductRepo.SelectProductByCondition(pageSize, begin, condition, flag)
	total := int(global.GProductRepo.GetTotalByCondition(condition,flag)[0])
	c.JSON(http.StatusOK, gin.H{
		"code": 1,
		"data":gin.H{
			"pageNum":pageNum,
			"total":total,
			"pageSize": 5,
			"list":products,
		},
	})
}
