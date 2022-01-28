import ajax from './ajax';

interface UserInfo{
  userName:string
  pwd:string
  email?:string
  phone?:string
}

export function apiLogin(userInfo:UserInfo){
  return ajax("/default/login", userInfo, "POST")
}

export function apiAddUser(userInfo:UserInfo){
  return ajax("/auth/manage/user/add", userInfo, "POST")
}

export function apiAuth(flag:boolean, setFlag:Function){
  ajax("/default/auth", {}, "POST")?.then((res) =>{
    if(res.data && res.data.value === -1){
      setFlag(!flag)
    }else{

    }
  })
}