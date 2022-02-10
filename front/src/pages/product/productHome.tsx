import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Space, Table } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons'
import { apiProducts, apiProductsCondition } from '../../api';
import { transformResData } from '../../utils/util';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
  },
  {
    title: '价格',
    dataIndex: 'price',

  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (text:string, record:any) =>{
      return(
        <Space vertical style={{width: '100%', height: '100%'}}>
          <Button>下架</Button>
          {record.value ? <div>在售</div> : <div>已下架</div>}
        </Space>
      )
    }
  },
  {
    title: '操作',
    dataIndex: '',
    render:(text:string, record:any) =>{
      return(
        <Space vertical style={{width: '100%', height: '100%'}}>
          <Button>Detail</Button>
          <Button>Update</Button>
        </Space>
      )
    }
  }

];

interface ProductHomeProps{

}

const ProductHome : React.FC<ProductHomeProps> = function(props){

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurPage] = useState(0)
  const [searchMode, setSearchMode] = useState("0")
  const [searchCondition, setSearchCondition] = useState("")
  const navigate = useNavigate()

  useEffect(() =>{
    getProducts(1)
  }, [])

  function searchChange(v:string){
    setSearchCondition(v)
  }

  function getProducts(pageNum:number){
    apiProducts({ pageNum:pageNum, pageSize:5}).then((res) =>{
      //@ts-ignore
      if(res.data && res.data.code !== -1){
        //@ts-ignore
        const list = []
        //@ts-ignore
        res.data.data.list.forEach((v:string, i:int, a:any) =>{
          list.push(transformResData(v))
        })
        //@ts-ignore
        setProducts(list)
        //@ts-ignore
        setTotal(Number(res.data.data.total))
        setCurPage(pageNum)
      }
    })
  }

  function getProductsByCondition(pageNum:number){
    //@ts-ignore
    apiProductsCondition({ pageNum:pageNum, pageSize:5, condition:searchCondition, flag: searchMode}).then((res) =>{
      //@ts-ignore
      if(res.data && res.data.code !== -1){
        //@ts-ignore
        const list = []
        //@ts-ignore
        res.data.data.list.forEach((v:string, i:int, a:any) =>{
          list.push(transformResData(v))
        })
        //@ts-ignore
        setProducts(list)
        //@ts-ignore
        setTotal(Number(res.data.data.total))
        setCurPage(pageNum)
      }
    })
  }

  function search(){
    setCurPage(1)
    if(searchCondition === "") {
      getProducts(1)
    }else{
      getProductsByCondition(1)
    }
  }

  function handlePageChange(pageNum:number){
    if(searchCondition === ""){
      getProducts(pageNum)
    }else{
      getProductsByCondition(pageNum)
    }
  }

  function addProduct(){
    navigate("/product/addUpdate")
  }
  return(
    <div className="min-h-full flex flex-col justify-start items-stretch">
      <div className="flex flex-row justify-between items-center p-4">
        <div className="w-80 flex flex-row justify-around items-center">
          <Space>
            <Select defaultValue="0" onChange={(v) => setSearchMode(v)}>
              <Select.Option value="0">按名称搜索</Select.Option>
              <Select.Option value="1">按描述搜索</Select.Option>
            </Select>
            <Input placeholder="请输入关键词" onChange={(v, e) => {searchChange(v)}}/>
            <Button onClick={() => search()}>搜索</Button>
          </Space>
        </div>
        <div>
          <Button
            onClick={() => addProduct()}
            icon={<IconPlus />}>
            添加商品
          </Button>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={products}
          pagination={{
            currentPage: currentPage,
            pageSize: 5,
            total: total,
            onPageChange: handlePageChange
          }}
        />
      </div>
    </div>
  )
}

export default ProductHome