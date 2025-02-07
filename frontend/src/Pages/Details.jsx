import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"; 
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaTruck, FaShieldAlt } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        toast.error("Product not found");
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-gray-700">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  // Function to render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500 text-lg" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 text-lg" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-lg" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
        
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg shadow-md w-full object-cover border border-gray-200"
          />
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600 text-sm">Category: <span className="font-semibold">{product.category}</span></p>
            <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-2 mt-2">
            {renderStars(product.rating)}
            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
          </div>

          {/* Pricing Section */}
          <div className="mt-4 flex items-center space-x-3">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-red-500">${product.discountPrice}</span>
                <span className="text-gray-500 line-through">${product.price}</span>
                <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">-{product.discount}%</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-800">${product.price}</span>
            )}
          </div>

          {/* Product Description */}
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Shipping & Secure Payment */}
          <div className="mt-6">
            <div className="flex items-center text-sm text-gray-700 space-x-2">
              <FaTruck className="text-green-500" />
              <p>Free Delivery in 3-5 Days</p>
            </div>
            <div className="flex items-center text-sm text-gray-700 space-x-2 mt-2">
              <FaShieldAlt className="text-blue-500" />
              <p>Secure Payment & Buyer Protection</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition duration-300">
              Buy Now
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-bold flex items-center space-x-2 hover:bg-blue-600 transition duration-300">
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
