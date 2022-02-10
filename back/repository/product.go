package repository

import (
	"back/model"
	"gorm.io/gorm"
)

type ProductRepo struct {
	Db *gorm.DB
}

func (p *ProductRepo) checkDb(){
	if p.Db == nil{
		p.Db = NewDb()
	}
}

func (p *ProductRepo) SelectProductByPage(pageSize int, end int) *[]model.Product{
	var ml []model.Product
	p.checkDb()
	p.Db.Raw("SELECT * FROM product ORDER BY ID DESC LIMIT ? OFFSET ?",pageSize, end).Scan(&ml)
	return &ml
}

func (p *ProductRepo) SelectProductByCondition(pageSize int, end int, condition string, flag string) *[]model.Product{
	var ml []model.Product
	p.checkDb()
	if flag == "0"{
		p.Db.Raw("SELECT * FROM product WHERE Name LIKE ? ORDER BY ID DESC LIMIT ? OFFSET ?", "%" + condition + "%", pageSize, end).Scan(&ml)
	}else{
		p.Db.Raw("SELECT * FROM product WHERE Desc LIKE ?  ORDER BY ID DESC LIMIT ? OFFSET ?", "%" + condition + "%", pageSize, end).Scan(&ml)
	}
	return &ml
}

func (p *ProductRepo) GetTotal() []uint8{
	var total []uint8
	p.checkDb()
	p.Db.Raw("SELECT COUNT(*) FROM product").Scan(&total)
	return total
}

func (p *ProductRepo) GetTotalByCondition(condition string, flag string) []uint8{
	var total []uint8
	p.checkDb()
	if flag == "0"{
		p.Db.Raw("SELECT COUNT(*) FROM product WHERE Name LIKE ?", condition).Scan(&total)
	}else{
		p.Db.Raw("SELECT COUNT(*) FROM product WHERE Desc LIKE ?", condition).Scan(&total)
	}
	return total
}
