import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='  flex flex-col justify-center items-center py-12'>
      <div className='flex flex-col space-y-6 items-center w-full max-w-md'>
        <h1 className='text-3xl font-bold text-slate-800'>Current Products</h1>
        <div className='text-center'>
          <span className='text-gray-600 mb-4'>No products found 😭   </span>
          <Link 
            to='/CreateProduct' 
            className='underline text-blue-500 font-bold'
          >
            Create a Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;