import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from '@douyinfe/semi-ui';
import { IconArrowRight, IconUpload } from '@douyinfe/semi-icons';
import { apiCategories } from '../../api';

interface ProductAddUpdateProps{

}

const ProductAddUpdate : React.FC<ProductAddUpdateProps> = function(props){
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() =>{
    getCategories()
  }, [])

  useEffect(() =>{
    console.log(categories)
  })

  function getCategories(){
    apiCategories({parentId: "0"}).then((res) =>{
      //@ts-ignore
      if(res.data && res.data.code === 1){
        //@ts-ignore
        const list = []
        //@ts-ignore
        res.data.data.forEach((v:any, i:number, a:any) =>{
          list.push({label:v.Name, value:v.ID})
        })
        //@ts-ignore
        setCategories(list)
      }
    })
  }

  function updateTreeData(){

  }

  function getSubCategories(parentId:string){
    return apiCategories({parentId: parentId})
  }

  function onLoadData(selectOpt:Array<any>){
    const targetOpt = selectOpt[selectOpt.length - 1]
    return new Promise((resolve) =>{
      if (targetOpt.children) {
        resolve(null);
        return;
      }
      getSubCategories(targetOpt.value).then((res) =>{
        //@ts-ignore
        if(res.data && res.data.code === 1){
          //@ts-ignore
          const list = []
          //@ts-ignore
          const newCategories = []
          //@ts-ignore
          res.data.data.forEach((v:Object, i:number, a:any) =>{
            //@ts-ignore
            list.push({label:v.Name, value:v.ID})
          })
          categories.forEach((v:Object, i:number, a:any) =>{
            //@ts-ignore
            if(v.value === targetOpt.value){
              //@ts-ignore
              v.children = list
            }
            newCategories.push(v)
          })
          //@ts-ignore
          setCategories(newCategories)
          resolve(1)
        }
      })
    })
  }

  return(
    <div>
      <Card
        title="添加商品"
        headerExtraContent={
          <IconArrowRight onClick={() => navigate("/product")}/>
        }
      >
        <Form layout="vertical" onValueChange={(v) => console.log(v)}>
          <Form.Input field="Name" label="Name" style={{width: "250px"}}/>
          <Form.Input field="Desc" label="Description" style={{width: "250px"}}/>
          <Form.Input field="Price" label="Price" style={{width: "250px"}}/>
          <Form.Cascader treeData={categories} field="Category" label="Category" loadData={onLoadData} style={{width: "250px"}}/>
          <Form.Upload action="www.test.com" field="Picture">
            <Button icon={<IconUpload />} >
              点击上传
            </Button>
          </Form.Upload>
          <Form.TextArea field="Detail" style={{width: "250px"}}/>
        </Form>
      </Card>
    </div>
  )
}

export default ProductAddUpdate