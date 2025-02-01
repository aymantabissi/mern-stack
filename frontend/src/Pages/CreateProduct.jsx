import React from 'react';

function CreateProduct() {
  return (
    <div className=' flex justify-center items-center py-12'>
      <div className='flex flex-col space-y-8 items-center w-full max-w-md'>
        <h1 className='text-3xl font-bold text-gray-800'>Create New Product</h1>
        <div className='flex flex-col space-y-6 bg-white p-8 rounded-lg shadow-lg w-full'>
          <input 
            className='border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
            type="text" 
            placeholder='Product Name' 
          />
          <input 
            className='border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
            type="number" 
            placeholder='Price' 
          />
          <input 
            className='border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
            type="text" 
            placeholder='Image URL' 
          />
          <input 
            className='bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer' 
            type="submit" 
            value="Create Product" 
          />
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;