import axios from 'axios';

type Method = "GET" | "POST" | "PUT" | "DELETE"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 1000,
});

export default function ajax(url:string, data:Object, method:Method){
  return new Promise((resolve, reject) =>{
    let promise = null
    if(method === "GET"){
      promise = instance.get(url, {
        params: data
      })
    } else if(method === "POST"){
      let formData = new FormData()
      for(let i in data){
        // @ts-ignore
        formData.append(i, data[i])
      }
      promise = instance.post(url,formData,{
        headers:{
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
    }else{
      return null
    }
    promise.then((res) => resolve(res)).catch((err) =>{
      console.error(err)
    })
  })
}