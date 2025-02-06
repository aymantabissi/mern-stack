import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../componentes/ProductCard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from 'jwt-decode';

function Home() {
  const { fetchProduct, products } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.role); // Set role (admin or user)
    }
  }, []);

  useEffect(() => {
    fetchProduct(); // Fetch products for the Home page
  }, [fetchProduct]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, products]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20 px-6 shadow-md">
        <h1 className="text-6xl font-extrabold">Bienvenue à Notre Boutique</h1>
        <p className="text-lg mt-4 opacity-80">Trouvez vos produits préférés aux meilleurs prix 🚀</p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        
        {/* Search Input */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Rechercher un produit..."
            className="border border-gray-300 rounded-full p-4 w-full max-w-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-lg"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} userRole={userRole} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} userRole={userRole} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-12 p-8 bg-white shadow-lg rounded-lg">
            <p className="text-lg text-gray-600 mb-4">Aucun produit trouvé 😭</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
