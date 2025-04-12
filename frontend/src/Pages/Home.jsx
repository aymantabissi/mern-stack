import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../componentes/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom"; // Import Link

function Home() {
  const { fetchProduct, products } = useProductStore();
  
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [userRole, setUserRole] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [productsPerPage] = useState(8); // Products per page
  
  // Get user role from token when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.role); 
    }
  }, []);

  // Fetch products when component mounts
  useEffect(() => {
    setLoading(true);
    fetchProduct()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to load products");
      });
  }, [fetchProduct]);

  // Filter products based on search term with a debounce effect
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
    }, 500); // Debounce delay of 500ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, products]);

  // Get products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.length > 0
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((filteredProducts.length > 0 ? filteredProducts.length : products.length) / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20 px-6 shadow-md">
        <h1 className="text-6xl font-extrabold">Bienvenue à Notre Boutique</h1>
        <p className="text-lg mt-4 opacity-80">Trouvez vos produits préférés aux meilleurs prix 🚀</p>
      </div>

      {/* This Month Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">This Month</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Example products for "This Month" */}
          {currentProducts.map((product) => (
            <div key={product._id} className="relative">
              {/* Pass product to ProductCard */}
              <ProductCard product={product} userRole={userRole} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  } hover:bg-gray-300`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
