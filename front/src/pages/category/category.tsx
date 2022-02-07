import React, { Fragment, useEffect, useState } from 'react';
import { Card, Button, Table, Toast, Modal, Input, Select, Space} from '@douyinfe/semi-ui';
import { IconPlus, IconArrowRight } from '@douyinfe/semi-icons';
import { v4 as uuidv4 } from 'uuid';
import { apiAddCategory, apiCategories, apiUpdateCategory, Categories } from '../../api';
import { transformResData } from '../../utils/util';
import type { BaseResData } from '../../type/res';
import Option from '@douyinfe/semi-ui/lib/es/select/option';

interface CategoryProps{

}

interface UpdModalFormProps{
  recode: any
  setCurRecord: Function
}

const UpdateModalForm : React.FC<UpdModalFormProps> = function (props){

  const {
    parentId,
    value,
    id,
    name
  } = props.recode
  const setCurRecord = props.setCurRecord

  return(
    <Fragment>
      <Input defaultValue={name}
             onChange={(v, e) =>{
               const newRecord = {
                 name,
                 value,
                 id,
                 parentId
               }
               newRecord.name = v
               setCurRecord(newRecord)
             }}
      />
    </Fragment>
  )
}

interface AddModalFormProps{
  categories: Array<any>
  addParentId:string
  setAddParentId:Function
  setAddName: Function
}

const AddModalForm : React.FC<AddModalFormProps> = function(props){

  function renderList(){
    const list = [<Select.Option value={"0"}>一级分类</Select.Option>]
    for(let i = 0; i < props.categories.length; ++i){
      list.push(<Select.Option value={props.categories[i].id}>{props.categories[i].name}</Select.Option>)
    }
    return list
  }


  return(
    <Fragment>
      <p className="mb-4">所属分类</p>
      <Select className="mb-4 w-full" defaultValue={props.addParentId} onChange={(v) => {props.setAddParentId(v)}}>
        {renderList()}
      </Select>
      <p className="mb-4">分类名称</p>
      <Input placeholder="请输入分类名称" defaultValue="" onChange={(v, e) =>{props.setAddName(v)}}/>
    </Fragment>
  )
}

const Category : React.FC<CategoryProps> = function(props){
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [parentId, setParentId] = useState("0")
  const [parentName, setParentName] = useState("")
  const [showCategoriesFlag, setCategoriesFlag] = useState(false)
  const [addModalFlag, setAddModalFlag] = useState(false)
  const [updateModalFlag, setUpdModalFlag] = useState(false)
  const [curRecord, setCurRecord] = useState({})
  const [addParentId, setAddParentId] = useState("0")
  const [addName, setAddName] = useState("")

  useEffect(() =>{
    getBaseCategories(parentId)
  }, [])

  function changeAddModalStatus(flag:boolean){
    setAddModalFlag(flag)
  }

  function changeUpdModalStatus(flag:boolean){
    setUpdModalFlag(flag)
  }

  function addCategory(){
    const newCategory = {
      name: addName,
      value: 0,
      parentId: addParentId,
      id: uuidv4()
    }

    apiAddCategory(newCategory).then((res) =>{
      //@ts-ignore
      if(res.data.code === 1){
        Toast.warning("添加成功")
      }else{
        Toast.warning("添加失败")
      }
    })
  }

  function updateCategory(record:any){
    apiUpdateCategory(record).then((res) =>{
      //@ts-ignore
      if(res.data.code === 1){
        if(!showCategoriesFlag){
          getBaseCategories("0")
        }else{
          getBaseCategories(parentId)
        }
        Toast.warning("更新成功")
      }else{
        Toast.warning("更新失败")
      }
    })
  }


  //Get all base categories
  function getBaseCategories(parentId:string){
    apiCategories({ parentId:parentId }).then((res) =>{
      // @ts-ignore
      if(res.data && res.data.code){
        // @ts-ignore
        let tempCategories:Array<Categories> = []
        // @ts-ignore
          res.data .data.forEach((v, i, a) =>{
            // @ts-ignore
            tempCategories.push(transformResData(v))
        })

        if(parentId === "0"){
          // @ts-ignore
          setCategories(tempCategories)
        }else {
          // @ts-ignore
          setSubCategories(tempCategories)
        }
      }else{
        Toast.warning("获取信息失败")
      }
    })
  }

  function toSubCategories(recode:any){
    setCategoriesFlag(true)
    setParentName(recode.name)
    getBaseCategories(recode.id)
  }

  function toCategories(){
    setCategoriesFlag(false)
    getBaseCategories("0")
  }

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (text:string, record:any) =>{
        return(
          <div className="flex flex-row justify-start items-center">
            <Button onClick={() =>{changeUpdModalStatus(true);setCurRecord(record)}}>修改分类</Button>
            {showCategoriesFlag ? <div></div> : <Button onClick={() => {toSubCategories(record)}}>查看子分类</Button>}
          </div>
        )
      }
    }
  ];
  return(
    <div>
      <Modal
        title="添加分类"
        visible={addModalFlag}
        onOk={() =>{addCategory();changeAddModalStatus(false)}}
        onCancel={() => {changeAddModalStatus(false)}}
        maskClosable={false}
      >
        <AddModalForm categories={categories} addParentId={addParentId} setAddParentId={setAddParentId} setAddName={setAddName}/>
      </Modal>
      <Modal
        title="更新分类"
        visible={updateModalFlag}
        onOk={() =>{changeUpdModalStatus(false);updateCategory(curRecord)}}
        onCancel={() => {changeUpdModalStatus(false)}}
        maskClosable={false}
      >
        <UpdateModalForm recode={curRecord} setCurRecord={setCurRecord}/>
      </Modal>
      <Card
        title={
          <div className="flex flex-row justify-start items-center">
            <Button onClick={() =>{toCategories()}}>一级分类列表</Button>
            {showCategoriesFlag ? <IconArrowRight /> : <div></div>}
            {showCategoriesFlag ? <div className="ml-2">{parentName}</div> : <div></div>}
          </div>
        }
        headerExtraContent={
          <Button icon={<IconPlus />} onClick={() =>{changeAddModalStatus(true)}}>
            添加
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={showCategoriesFlag ? subCategories : categories}
          pagination={{
            pageSize: 5
          }}
          />
      </Card>
    </div>
  )
}

export default Category