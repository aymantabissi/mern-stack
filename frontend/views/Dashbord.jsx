import { useEffect, useState } from "react";
import { useProductStore } from "../src/store/product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for editing and deleting
import { Link } from "react-router-dom"; // Import Link for navigation
import * as XLSX from "xlsx"; // Import xlsx for exporting data to Excel

function Dashbord() {
  const { fetchProduct, products, deleteProduct } = useProductStore();
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [loading, setLoading] = useState(true); // Track the loading state while decoding the token
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [productsPerPage] = useState(10); // Products per page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortBy, setSortBy] = useState("name"); // Sort by name, price, or category
  const [filterCategory, setFilterCategory] = useState(""); // Filter by category
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.role);
      setUserName(decodedToken.name); // Assuming the user's name is stored in the token
    }
    setLoading(false); // Set loading to false after decoding
  }, []);

  // Redirect to Home if not Admin and loading is complete
  useEffect(() => {
    if (loading) return; // Don't perform redirection if still loading
    if (userRole !== "admin") {
      navigate("/home"); // Redirect to home page if the user is not admin
    }
  }, [userRole, loading, navigate]);

  useEffect(() => {
    fetchProduct(); // Fetch products for the Dashboard
  }, [fetchProduct]);

  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  // Generate correct image URL (in case of relative path)
  const getImageUrl = (imagePath) => {
    return imagePath && imagePath.startsWith('/uploads/')
      ? `http://localhost:5000${imagePath}`
      : imagePath || 'http://localhost:5000/uploads/default-image.jpg'; // Default image if none is provided
  };

  // Get current products based on the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Filter and sort products
  const filteredProducts = products.filter(product => 
    (filterCategory ? product.category === filterCategory : true) && 
    (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get unique categories for filter options
  const categories = [...new Set(products.map(product => product.category))];

  // Calculate statistics for total, new, sold, and returned products
  const totalStocks = products.reduce((sum, product) => sum + product.stock, 0);
  const newProducts = products.filter(product => product.isNew).length;
  const soldProducts = products.reduce((sum, product) => sum + product.totalSales, 0);
  const returnedProducts = products.reduce((sum, product) => sum + product.totalReturns, 0);

  // Function to export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        {/* Personalized Greeting for Admin */}
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12">
          Hello, {userName ? userName : "Admin"}!
        </h1>

        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-12">
          Admin Dashboard
        </h2>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-green-100 p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold">Total Stocks</p>
            <p className="text-3xl font-bold">{totalStocks}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold">New Products</p>
            <p className="text-3xl font-bold">{newProducts}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold">Sold Products</p>
            <p className="text-3xl font-bold">{soldProducts}</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold">Returned Products</p>
            <p className="text-3xl font-bold">{returnedProducts}</p>
          </div>
        </div>

        {/* Add New Product Button */}
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <Link to="/create-product">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
                + Add New Product
              </button>
            </Link>
            <button
              onClick={exportToExcel}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
            >
              Export to Excel
            </button>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentProducts.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <img
                        src={getImageUrl(product.image)} // Use the helper function to set the image URL
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="ml-4">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/update-product/${product._id}`)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
