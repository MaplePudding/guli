package model

type Product struct {
	Name string
	Desc string
	Price int
	CategoryId string
	ID string
	Value int
	Status int
	PCategoryId string
}

func (*Product) TableName() string{
	return "product"
}