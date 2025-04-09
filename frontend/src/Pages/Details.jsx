import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"; 
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaTruck, FaShieldAlt, FaHeart, FaPlus, FaMinus } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log(response.data); // ✅ Check API response in console
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
        
        {/* Sidebar for Product Images */}
        {/* Sidebar for Product Images */}
<div className="flex flex-col space-y-3 mr-4">
{product?.images?.length > 0 ? (
  product.images.map((img, index) => (
    <img
      key={index}
      src={`http://localhost:5000${img}`} // ✅ Ensure correct URL format
      alt={`Preview ${index + 1}`}
      className="w-16 h-16 rounded-md border cursor-pointer hover:border-red-500"
    />
  ))
) : (
  <p className="text-gray-500">No images available</p>
)}
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

          {/* Color Selection */}
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-gray-600 font-semibold">Colours:</span>
            <div className="w-6 h-6 rounded-full bg-gray-900 cursor-pointer border-2 border-gray-400"></div>
            <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border-2 border-gray-400"></div>
          </div>

          {/* Size Selection */}
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-gray-600 font-semibold">Size:</span>
            {["XS", "S", "M", "L", "XL"].map((size, index) => (
              <button
                key={index}
                className="px-3 py-1 border rounded-md text-gray-600 hover:bg-red-500 hover:text-white transition"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-gray-600 font-semibold">Quantity:</span>
            <button
              className="border p-2 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <FaMinus />
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="border p-2 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={() => setQuantity(quantity + 1)}
            >
              <FaPlus />
            </button>
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
            <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-bold flex items-center space-x-2 hover:bg-gray-400 transition duration-300">
              <FaHeart />
              <span>Wishlist</span>
            </button>
          </div>

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
        </div>
      </div>
    </div>
  );
}

export default Details;
