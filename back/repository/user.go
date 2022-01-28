package repository

import (
	"back/model"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type UserRepo struct {
	Db *gorm.DB
}

func NewUserDb() *gorm.DB{
	dsn := "root:123456@tcp(127.0.0.1:3306)/guli?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Sprintf("Create Conn Error")
	}

	return db
}

func (u *UserRepo) checkDb(){
	if u.Db == nil{
		u.Db = NewUserDb()
	}
}

func (u *UserRepo) SelectOne(userName string) *model.User {
	var ml []model.User
	u.checkDb()
	u.Db.Where("UserName = ?", userName).Find(&ml)
	return &ml[0]
}

func (u *UserRepo) SelectAll(userName string) *[]model.User{
	var ml []model.User
	u.checkDb()
	u.Db.Where("UserName = ?", userName).Find(&ml)
	return &ml
}

func(u *UserRepo) Delete(userName string){
	u.checkDb()
	u.Db.Where("UserName = ?", userName).Delete(u.Db.Select(userName))
}

func(u *UserRepo) Update(userEntity *model.User){
	u.checkDb()
	u.Db.Save(userEntity)
}

func(u *UserRepo) Insert(userEntity *model.User){
	u.checkDb()
	u.Db.Create(userEntity)
}