import React, { useEffect, useState } from 'react';
import { useProductStore } from '../src/store/product';
import ProductCard from '../src/componentes/ProductCard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { fetchProduct, products } = useProductStore();
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(""); // State to store the user's name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.role);
      setUserName(decodedToken.name); // Assuming the user's name is stored in the token
    }
  }, []);

  // Redirect to Home if not Admin
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/Dashbord'); // Redirect to home page if the user is not admin
    }
  }, [userRole, navigate]);

  useEffect(() => {
    fetchProduct(); // Fetch products for the Dashboard
  }, [fetchProduct]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        {/* Personalized Greeting for Admin */}
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12">
          Hello, {userName ? userName : 'Admin'}!
        </h1>

        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-12">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} userRole={userRole} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
