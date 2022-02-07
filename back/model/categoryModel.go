package model

type Category struct {
	Name string
	ParentId string
	ID string
	Value int
}

func (*Category) TableName() string{
	return "category"
}
