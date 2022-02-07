package repository

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func NewDb() *gorm.DB{
	dsn := "root:123456@tcp(127.0.0.1:3306)/guli?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger:logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		fmt.Sprintf("Create Conn Error")
	}

	return db
}
