import { useState } from "react";
import { useProductStore } from "../store/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProductStore();

  // Handle file selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category || !newProduct.description || !imageFile) {
      toast.error("Please fill all fields and select an image!");
      return;
    }

    setLoading(true); // Show loading indicator

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("category", newProduct.category);
    formData.append("description", newProduct.description);
    formData.append("image", imageFile); // Add image file to the form data

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData, // Send as FormData, not JSON
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message || "Error creating product");
    } else {
      toast.success("Product created successfully!");
      setTimeout(() => navigate("/Dashbard"), 2000);
    }

    setLoading(false); // Hide loading indicator
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col space-y-8 items-center w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Create New Product</h1>

        <div className="flex flex-col space-y-4 w-full">
          <input
            className="input-field"
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <input
            className="input-field"
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
          />

          {/* File Upload */}
          <input className="input-field" type="file" accept="image/*" onChange={handleImageChange} />

          {/* Image Preview */}
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected"
              className="w-32 h-32 object-cover mt-4"
            />
          )}

          <input
            className="input-field"
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock Quantity"
          />
          <input
            className="input-field"
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
          <textarea
            className="input-field h-24 resize-none"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Product Description"
          />

          <button
            className="bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            onClick={handleAddProduct}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
