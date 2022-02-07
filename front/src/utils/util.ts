import type { BaseResData } from '../type/res';

export function transformResData(data:Object){
  let keys = Object.keys(data)
  const o = {}
  keys.forEach((v, i, a) =>{
    if(v.length === 2){
      // @ts-ignore
      o[v.toLowerCase()] = data[v]
    }else{
      // @ts-ignore
      o[v.replace(v[0], v[0].toLowerCase())] = data[v]
    }
  })
  return o
}