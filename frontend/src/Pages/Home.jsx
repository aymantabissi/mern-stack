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
    <div className="bg-gray-50 min-h-screen font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12">Découvrez Nos Produits</h1>

        {/* Search Input */}
        <div className="relative mb-8 w-full max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un produit..."
            className="border border-gray-300 rounded-lg p-4 w-full shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} userRole={userRole} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
