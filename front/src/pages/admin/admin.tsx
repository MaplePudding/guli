import React, { useEffect, useState} from 'react';
import { useNavigate, Routes, Route, Navigate, BrowserRouter, HashRouter, useLocation } from 'react-router-dom';
import { Nav, Popconfirm, Button, Toast } from '@douyinfe/semi-ui';
import {IconHome, IconCart, IconUser, IconUserSetting} from '@douyinfe/semi-icons';
import { apiAuth } from '../../api';
import { clearAllCookie, getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/memory';
import menuList, { MenuItem } from '../../config/menuConfig';
import logo from "/img/logo.png"
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

interface AdminProps{

}

const Admin : React.FC<AdminProps> = function(props : AdminProps){
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState(["home"]);
  const [openKeys, setOpenKeys] = useState(["commodity"])

  useEffect(() => {
    apiAuth().then((res) =>{
      //@ts-ignore
      if(res.data && res.data.code === -1){
        navigate("/login")
      }else{
        //@ts-ignore
        setLocalStorage("userName", res.data.data.userName)
      }
  })},[])


  function onConfirm() {
    Toast.success('已退出！')
    removeLocalStorage('userName')
    clearAllCookie()
    navigate("/login")
  };

  function onCancel() {
    Toast.warning('取消退出！')
  };


  return(
        <div className="min-h-screen flex flex-row justify-start items-stretch">
          <Nav defaultSelectedKeys={['home']}
               openKeys={openKeys}
               onSelect={data => console.log('trigger onSelect: ', data)}
               onClick={data => setSelectedKeys([data.itemKey])}
               items={menuList}
               selectedKeys={selectedKeys}
               onOpenChange={(data) => setOpenKeys(data.openKeys)}
          >
            <Nav.Header logo={<img src={logo}/>} text={'后台管理'}/>
          </Nav>

          <div className="flex flex-col justify-start items-stretch grow">
            <div style={{borderBottom: "2px solid #F4F5F5"}}>
              <div className="text-right w-9/12" style={{display:"inline-block"}}>

                欢迎 &nbsp;{getLocalStorage('userName')}&nbsp;
              </div>
              <Popconfirm
                title="确定退出登录？"
                content="此修改将不可逆"
                onConfirm={onConfirm}
                onCancel={onCancel}
                position={"leftBottom"}
              >
                <Button>退出</Button>
              </Popconfirm>
            </div>
            <div className="grow p-6" style={{backgroundColor: "#EDF2F3"}}>
              <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/category" element={<Category />}/>
                <Route path="/product/*" element={<Product />}/>
                <Route path="/role" element={<Role />}/>
                <Route path="/user" element={<User />}/>
                <Route path="/charts/bar" element={<Bar />}/>
                <Route path="/charts/line" element={<Line />}/>
                <Route path="/charts/pie" element={Pie}/>
                <Route index element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
    )
}

export default Admin



