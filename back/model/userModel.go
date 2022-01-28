package model

type User struct {
	UserName string
	PassWord string
}

func (*User) TableName() string{
	return "user"
}

