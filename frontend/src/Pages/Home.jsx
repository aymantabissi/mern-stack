import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useProductStore } from '../store/product';
import ProductCard from '../componentes/ProductCard';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const { fetchProduct, products, deleteAllProducts, searchProducts } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchProducts(searchTerm); // Call searchProducts with the search term
      toast.success(`Search completed for "${searchTerm}"`);
    } else {
      toast.error("Please enter a search term.");
    }
  };

  const handleDeleteAllProducts = async () => {
    try {
      const { success, message } = await deleteAllProducts();
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error deleting all products:", error);
      toast.error("An error occurred while deleting the products.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8">
          Découvrez Nos Produits
        </h1>

        {/* Search Input */}
        <div className="text-center mb-8">
          <form onSubmit={handleSearchSubmit} className="inline-block relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Rechercher un produit..."
              className="border border-gray-300 rounded-lg p-4 w-80 shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bg-blue-600 text-white font-semibold py-4 px-6 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Rechercher
            </button>
          </form>
        </div>

        {/* Delete All Products Button - Only show if more than 1 product */}
        {products.length > 1 && (
          <div className="text-center mb-8">
            <button
              onClick={handleDeleteAllProducts}
              className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              Supprimer tous les produits
            </button>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-12 p-8 bg-white shadow-lg rounded-lg">
            <p className="text-lg text-gray-600 mb-4">Aucun produit trouvé 😭</p>
            <Link 
              to="/CreateProduct" 
              className="text-blue-600 font-semibold hover:underline text-lg"
            >
              Créez un produit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
