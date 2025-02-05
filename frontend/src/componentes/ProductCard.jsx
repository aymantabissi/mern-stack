import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProductCard({ product, userRole }) {
  const location = useLocation(); // Get the current location (to check if we're on Dashboard or Home page)

  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover rounded-t-xl opacity-90 hover:opacity-100 transition"
      />
      <div className="p-5 text-white">
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
        <p className="text-lg text-gray-300 mb-4">${product.price}</p>
        
        <div className="flex space-x-4">
          {/* Show Update and Delete buttons only if Admin and on Dashboard page */}
          {userRole === "admin" && location.pathname === "/dashboard" ? (
            <>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Update
              </button>
              <button className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400">
                Delete
              </button>
            </>
          ) : (
            <>
              {/* Always show Add to Cart and Details buttons for both Admin and User on Home page */}
              <Link to="/panier" className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400">
                Ajouter au Panier
              </Link>
              <Link to={`/details/${product._id}`} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Détails
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
