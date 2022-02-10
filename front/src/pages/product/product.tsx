import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductHome from './productHome';
import ProductAddUpdate from './productAddUpdate';
import ProductDetail from './productDetail';

interface ProductProps{

}

const Product : React.FC<ProductProps> = function(props){
  return(
    <div className="min-h-full bg-white">
      <Routes>
        <Route index element={<ProductHome />}/>
        <Route path="/addupdate" element={<ProductAddUpdate />}/>
        <Route path="/detail" element={<ProductDetail />}/>
      </Routes>
    </div>
  )
}

export default Product
