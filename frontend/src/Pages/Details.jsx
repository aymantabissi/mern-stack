import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"; 
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaTruck, FaShieldAlt, FaHeart, FaPlus, FaMinus } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize product as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate(); // Add navigate for routing

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.image || "http://localhost:5000/uploads/default-image.jpg"); // Fallback image if product image is missing
      } catch (err) {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    // Navigate to checkout and pass the product data to the checkout page
    navigate('/checkout', { state: { product } });
  };

  // Fetch recommendations based on the product category
  useEffect(() => {
    if (product?.category && product._id) {
      setLoading(true);
      const fetchRecommendations = async () => {
        try {
          const res = await axios.post("http://localhost:5001/recommendations", {
            category: product.category,
            product_id: product._id,
          });
          if (Array.isArray(res.data)) {
            const updatedRecommendations = res.data.map((rec) => {
              const fullImageUrl = rec.image
                ? `${window.location.protocol}//${window.location.host}${rec.image}`  // Full URL for the image
                : "http://localhost:5000/uploads/default-image.jpg";  // Default image URL for fallback
              return { ...rec, image: fullImageUrl };
            });
            setRecommendations(updatedRecommendations);
          } else {
            setRecommendations([]);
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          toast.error("Error fetching recommendations.");
        } finally {
          setLoading(false);
        }
      };
      fetchRecommendations();
    }
  }, [product]);

  // Early return while loading or if product is null
  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-gray-700">Loading...</div>;
  if (!product) return <div className="text-center text-red-500">Product not found</div>;

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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-center items-center">
      <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mb-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3">
            {/* Check if product exists and has images before rendering */}
            {product?.images && product.images.length > 0 ? 
              product.images.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`w-20 h-20 object-cover border rounded-md cursor-pointer transition-transform transform hover:scale-105 ${mainImage === img ? 'border-red-500' : 'border-gray-300'}`}
                  onClick={() => setMainImage(img)}
                />
              )) : (
                <img src={product?.image || "http://localhost:5000/uploads/default-image.jpg"} alt="Product" className="w-20 h-20 object-cover border rounded-md" />
              )
            }
          </div>
          <div className="flex-1">
            <img
              src={mainImage || product?.image || "http://localhost:5000/uploads/default-image.jpg"}  // Fallback if no main image
              alt={product?.name || "Product"}
              className="w-full h-[500px] object-contain rounded-lg border shadow-lg hover:scale-105 transition-transform"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-extrabold text-gray-800">{product?.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            {renderStars(product?.rating)}
            <span className="text-gray-500 text-sm">({product?.reviews} reviews)</span>
          </div>
          <div className="mt-4 flex items-center space-x-3">
            {product?.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-red-500">${product?.discountPrice}</span>
                <span className="text-gray-500 line-through text-lg">${product?.price}</span>
                <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-md">-{product?.discount}%</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-800">${product?.price}</span>
            )}
          </div>
          <p className="mt-4 text-gray-600">{product?.description}</p>

          <div className="mt-4 flex items-center space-x-3">
            <span className="text-gray-600 font-semibold">Colours:</span>
            <div className="w-6 h-6 rounded-full bg-gray-900 cursor-pointer border-2 border-gray-400"></div>
            <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border-2 border-gray-400"></div>
          </div>

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

          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleBuyNow}
              className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition duration-300"
            >
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

      {/* Recommendations Section */}
      <div className="w-full max-w-6xl mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Items</h2>
        {loading ? (
          <p className="text-gray-600">Loading recommendations...</p>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <div key={rec._id} className="bg-white border p-4 rounded-lg shadow-lg hover:shadow-xl transition">
                {rec.discount && (
                  <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-md absolute top-2 right-2">
                    -{rec.discount}%
                  </span>
                )}
                <img
                  src={rec.image || "http://localhost:5000/uploads/default-image.jpg"}
                  alt={rec.name}
                  className="h-40 w-full object-cover rounded mb-4"
                />
                <h3 className="font-semibold text-lg">{rec.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  {renderStars(rec.rating)}
                  <span className="text-gray-500 text-sm">({rec.reviews})</span>
                </div>
                <p className="font-bold text-blue-600 mt-2">
                  ${rec.discountPrice || rec.price}
                  {rec.discountPrice && (
                    <span className="line-through text-gray-500 text-sm ml-2">${rec.price}</span>
                  )}
                </p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-bold mt-4 w-full hover:bg-blue-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No related items found.</p>
        )}
      </div>
    </div>
  );
}

export default Details;
