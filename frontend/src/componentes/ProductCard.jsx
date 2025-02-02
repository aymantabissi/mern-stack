import React from 'react';
import { useProductStore } from '../store/product';

function ProductCard({ product }) {
    const {deleteProduct}=useProductStore()
    const handleDeleteProduct = async (pid) => {
        try {
            const { success, message } = await deleteProduct(pid);
            
            if (success) {
                alert("Product deleted successfully");
            } else {
                alert(`Failed to delete product: ${message}`);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product");
        }
    };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-52 object-cover rounded-t-xl"
      />
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{product.name}</h2>
        <p className="text-lg text-gray-700 mb-4">${product.price}</p>
        <div className="flex space-x-4">
          <button 
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
          <button 
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={()=>handleDeleteProduct(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
