import React, { useState } from 'react';
import { useProductStore } from '../store/product';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';



function CreateProduct() {
  const navigate=useNavigate()
    const [newProduct ,setProduct]=useState({
        name:"",
        price:"",
        image:"",
    })
  const {createProduct}= useProductStore()
    const handelAddProduct= async () =>{
        const {success,message}=await createProduct(newProduct)
        console.log(success)
        console.log(message)
        if(success){
          toast.success(message);
          setTimeout(()=>{
            navigate('/')


          },3000)
      

        }else{
          toast.error('pls remplir field')
        }
        
       
    }
  return (
    <div className='dark:bg-neutral-900'>
        <ToastContainer position="top-right" autoClose={3000} />
    <div className=' flex justify-center items-center py-12 bg-neutral-100 '>
      <div className='flex flex-col space-y-8 items-center w-full max-w-md dark:bg-neutral-900'>
        <h1 className='text-3xl font-bold text-gray-800'>Create New Product</h1>
        <div className='flex flex-col space-y-6 bg-white p-8 rounded-lg shadow-lg w-full'>
          <input 
            className='border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
            type="text" 
            name='name'
            value={newProduct.name}
            onChange={(e)=>{setProduct({...newProduct , name:e.target.value})}}
            placeholder='Product Name' 
          />
          <input 
            className='border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
            type="number" 
            name='price'
            value={newProduct.price}
            onChange={(e)=>{setProduct({...newProduct , price:e.target.value})}}
            placeholder='Price' 
          />
          <input 
            className='border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
            type="text" 
            name='image'
            value={newProduct.image}
            onChange={(e)=>{setProduct({...newProduct , image:e.target.value})}}
            placeholder='Image URL' 
          />
          <input 
            className='bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer' 
            type="submit" 
            onClick={handelAddProduct}
            value="Create Product" 
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default CreateProduct;