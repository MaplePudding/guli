import ajax from './ajax';

export interface UserInfo{
  userName:string
  pwd:string
  email?:string
  phone?:string
}

export interface Categories{
  parentId: string
  id: string
  name: string
  value: number
}

export function apiLogin(userInfo:UserInfo){
  return ajax("/default/login", userInfo, "POST")
}

export function apiAddUser(userInfo:UserInfo){
  return ajax("/auth/manage/user/add", userInfo, "POST")
}

export function apiAuth(){
  return ajax("/default/auth", {}, "POST")
}

export function apiCategories(data:{parentId:string}){
  return ajax("/auth/manage/category/list", data, "GET")
}

export function apiAddCategory(data:Categories){
  return ajax("/auth/manage/category/add", data, "POST")
}

export function apiUpdateCategory(data:Categories){
  return ajax("/auth/manage/category/update", data, "POST")
}