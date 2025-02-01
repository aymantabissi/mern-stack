import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CreateProduct from './Pages/CreateProduct'
import Navbar from './componentes/Navbar'
import { useProductStore } from './store/product'


function App() {
  const {products}=useProductStore()
  return (
    <div >
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/CreateProduct' element={<CreateProduct/>}/>
      </Routes>

      
    </div>
  )
}

export default App
