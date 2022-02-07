import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Input, Button} from '@douyinfe/semi-ui';
import aes from 'crypto-js/aes'
import CryptoJS from 'crypto-js'
import logo from '/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { apiAddUser, apiAuth, apiLogin } from '../../api';
import { setLocalStorage } from '../../utils/memory';

interface LoginProps{
    
}

const Login : React.FC<LoginProps> = function(props : LoginProps){
  const [userName, setName] = useState("admin")
  const [pwd, setPwd] = useState("admin")
  const navigate = useNavigate()

  function onNameChange(val:string, e:ChangeEvent<HTMLInputElement>){
    setName(val)
  }

  function onPwdChange(val:string, e:ChangeEvent<HTMLInputElement>){
    setPwd(val)
  }

  function aesCbcEncrypt(text:string) {
    const key = CryptoJS.enc.Utf8.parse("maple".repeat(3) + "m")
    let encrypted = aes.encrypt(text, key, {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: key})
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }

  function submit(e:React.MouseEvent){
    apiLogin({userName, pwd:aesCbcEncrypt(pwd)}).then((res) => {
      //@ts-ignore
      if(res.data && res.data.code === 1){
        //@ts-ignore
        setLocalStorage("userName", res.data.data.userName)
        navigate("/")
      }
    })
  }

    return(
        <div className={"h-screen flex flex-col justify-start items-stretch bg-login-bg"}>
          <header className={"h-20 grow-0 bg-black opacity-70 flex flex-row justify-start items-center"}>
            <img className={"h-3/4 ml-6"} src={logo} />
            <div className={"ml-6 text-white text-2xl"}>
              后台管理系统
            </div>
          </header >
          <div className={"flex justify-center items-center grow"}>
            <div className={"w-64 h-80 p-5 flex flex-col justify-around bg-white"}>
              <div className={"text-2xl text-center"}>
                Login
              </div>
              <Input placeholder="Name:" defaultValue={userName} onChange={(val, e) => onNameChange(val, e)}>

              </Input>
              <Input placeholder="Password" mode="password" defaultValue={pwd} onChange={(val, e) => onPwdChange(val, e)}>

              </Input>
              <Button onClick={(e) => submit(e)}

              >
                Submit
              </Button>
            </div>
          </div>

        </div>
    )
}

export default Login



