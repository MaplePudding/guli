package repository

import (
	"back/model"
	"gorm.io/gorm"
)


type CategoryRepo struct {
	Db *gorm.DB
}

func (c *CategoryRepo) checkDb(){
	if c.Db == nil{
		c.Db = NewDb()
	}
}

func (c *CategoryRepo) SelectOne(parentId string) *model.Category {
	var ml []model.Category
	c.checkDb()
	c.Db.Where("ParentId = ?", parentId).Find(&ml)
	return &ml[0]
}

func (c *CategoryRepo) SelectAllCategory(parentId string) *[]model.Category{
	var ml []model.Category
	c.checkDb()
	c.Db.Where("ParentId = ?", parentId).Find(&ml)
	return &ml
}

func (c *CategoryRepo) SelectAllSubCategory(id string) *[]model.Category{
	var ml []model.Category
	c.checkDb()
	c.Db.Where("ParentId = ?", id).Find(&ml)
	return &ml
}



func (c *CategoryRepo) Delete(parentId string){
	c.checkDb()
	c.Db.Where("ParentId = ?", parentId).Delete(c.Db.Select(parentId))
}

func (c *CategoryRepo) Update(categoryEntity *model.Category){
	var ml []model.Category
	c.checkDb()
	c.Db.Raw("UPDATE category SET Name = ? WHERE ID = ?", categoryEntity.Name, categoryEntity.ID).Scan(ml)
}

func (c *CategoryRepo) Insert(categoryEntity *model.Category){
	var ml []model.Category
	c.checkDb()
	c.Db.Raw("INSERT INTO category (ParentId, ID, Name, Value) VALUES (?, ?, ?, ?)", categoryEntity.ParentId, categoryEntity.ID, categoryEntity.Name, categoryEntity.Value).Scan(ml)
}
