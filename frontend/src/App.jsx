import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CreateProduct from './Pages/CreateProduct'
import Navbar from './componentes/Navbar'
import { useProductStore } from './store/product'
import Footer from './componentes/Footer'
import About from './Pages/About'
import Contact from './Pages/Contact'


function App() {
  const {products}=useProductStore()
  return (
    <div >
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/CreateProduct' element={<CreateProduct/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>


      </Routes>

      <Footer/>

      
    </div>
  )
}

export default App
