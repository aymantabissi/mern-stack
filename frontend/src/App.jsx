import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CreateProduct from './Pages/CreateProduct'
import Navbar from './componentes/Navbar'
import { useProductStore } from './store/product'
import Footer from './componentes/Footer'


function App() {
  const {products}=useProductStore()
  return (
    <div >
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/CreateProduct' element={<CreateProduct/>}/>
      </Routes>

      <Footer/>

      
    </div>
  )
}

export default App
