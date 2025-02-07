import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import CreateProduct from './Pages/CreateProduct';
import Navbar from './componentes/Navbar';
import { useProductStore } from './store/product';
import Footer from './componentes/Footer';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Panier from './Pages/Panier';
import Details from './Pages/Details';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashbord from '../views/Dashbord';
import { PrivateRoute } from './componentes/PrivateRoute .jsx';

function App() {
  const { products } = useProductStore();

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Home should always be public */}
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect "/" to "/home" */}
        <Route path="/home" element={<Home />} /> {/* Public Home page */}

        <Route path='/CreateProduct' element={<CreateProduct />} />
        <Route path='/About' element={<About />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Panier' element={<Panier />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path='/Contact' element={<Contact />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Private route for dashboard, only accessible by admin and manager */}
        <Route 
          path="/Dashbord" 
          element={<PrivateRoute element={<Dashbord />} roles={["admin", "manager"]} />} 
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
