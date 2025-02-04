import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CreateProduct from './Pages/CreateProduct'
import Navbar from './componentes/Navbar'
import { useProductStore } from './store/product'
import Footer from './componentes/Footer'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Panier from './Pages/Panier'
import Details from './Pages/Details'


function App() {
  const {products}=useProductStore()
  return (
    <div >
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/CreateProduct' element={<CreateProduct/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Panier' element={<Panier/>}/>
        <Route path='/Details' element={<Details/>}/>
        <Route path='/Contact' element={<Contact/>}/>


      </Routes>

      <Footer/>

      
    </div>
  )
}

export default App
