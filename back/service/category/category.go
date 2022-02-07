package category

import (
	"back/global"
	"back/model"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

var RCategoriesHandler gin.HandlerFunc = func(c *gin.Context){
	parentId := c.DefaultQuery("parentId", "0")
	var categories *[]model.Category
	if parentId == "0"{
		categories = global.GCategoryRepo.SelectAllCategory(parentId)
	}else{
		categories = global.GCategoryRepo.SelectAllSubCategory(parentId)
	}
	c.JSON(http.StatusOK, gin.H{
		"code": 1,
		"data": *categories,
	})
}

var RAddCategoryHandler gin.HandlerFunc = func(c *gin.Context){
	value, err := strconv.Atoi(c.PostForm("value"))
	if err != nil{
		value = 0
	}
	categoryItem := &model.Category{
		ID: c.PostForm("id"),
		ParentId: c.PostForm("parentId"),
		Name: c.PostForm("name"),
		Value: value,
	}

	log.Printf("%v", categoryItem)
	global.GCategoryRepo.Insert(categoryItem)
	c.JSON(http.StatusOK, gin.H{
		"code": 1,
		"data": "success",
	})
}

var RUpdateCategoryHandler gin.HandlerFunc = func(c *gin.Context){
	value, err := strconv.Atoi(c.PostForm("value"))
	if err != nil{
		value = 0
	}
	categoryItem := &model.Category{
		ID: c.PostForm("id"),
		ParentId: c.PostForm("parentId"),
		Name: c.PostForm("name"),
		Value: value,
	}
	global.GCategoryRepo.Update(categoryItem)
	c.JSON(http.StatusOK, gin.H{
		"code": 1,
		"data": "success",
	})
}
