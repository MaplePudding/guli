package repository

import (
	"back/model"
	"gorm.io/gorm"
)

type UserRepo struct {
	Db *gorm.DB
}

func (u *UserRepo) checkDb(){
	if u.Db == nil{
		u.Db = NewDb()
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