import React from 'react';
import {IconHome, IconCart, IconUser, IconUserSetting, IconShoppingBag} from '@douyinfe/semi-icons';

export interface MenuItem{
  itemKey:string,
  text: string,
  icon?: JSX.Element,
  items?: Array<MenuItem>,
  link?: string
}

const menuList:Array<MenuItem> = [
  { itemKey: 'home', text: '首页', icon: <IconHome />, link:'/#/home'},
  { itemKey: 'commodity', text: '商品', icon: <IconCart />, items:[{itemKey:'cc', text:'品类管理', icon: <IconShoppingBag />, link: '/#/category'}, {itemKey:'cm', text:'商品管理', icon: <IconShoppingBag />, link: '/#/product'}]},
  { itemKey: 'user', text: '用户管理', icon: <IconUser />, link:"/#/user"},
  { itemKey: 'role', text: '角色管理', icon: <IconUserSetting />, link: "/#/role"},

]

export default menuList