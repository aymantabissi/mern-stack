import  { useState } from 'react';
import { useProductStore } from '../store/product';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const navigate = useNavigate();
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    stock: "",
    category: "",
    description: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.stock || !newProduct.category || !newProduct.description) {
      toast.error('Please fill all fields');
      return;
    }

    const { success, message } = await createProduct(newProduct);
    
    if (success) {
      toast.success(message);
      setTimeout(() => {
        navigate('/Dashbord');
      }, 3000);
    } else {
      toast.error('Error creating product');
    }
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
            onChange={(e) => setProduct({ ...newProduct, name: e.target.value })}
            placeholder="Product Name" 
          />
          <input 
            className="input-field" 
            type="number" 
            name="price"
            value={newProduct.price}
            onChange={(e) => setProduct({ ...newProduct, price: e.target.value })}
            placeholder="Price" 
          />
          <input 
            className="input-field" 
            type="text" 
            name="image"
            value={newProduct.image}
            onChange={(e) => setProduct({ ...newProduct, image: e.target.value })}
            placeholder="Image URL" 
          />
          <input 
            className="input-field" 
            type="number" 
            name="stock"
            value={newProduct.stock}
            onChange={(e) => setProduct({ ...newProduct, stock: e.target.value })}
            placeholder="Stock Quantity" 
          />
          <input 
            className="input-field" 
            type="text" 
            name="category"
            value={newProduct.category}
            onChange={(e) => setProduct({ ...newProduct, category: e.target.value })}
            placeholder="Category" 
          />
          <textarea
            className="input-field h-24 resize-none"
            name="description"
            value={newProduct.description}
            onChange={(e) => setProduct({ ...newProduct, description: e.target.value })}
            placeholder="Product Description"
          />
          <button 
            className="bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer" 
            onClick={handleAddProduct}
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
