import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProductStore } from "../store/product";
import { toast } from "react-toastify";

function ProductCard({ product, userRole }) {
  const { updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const location = useLocation();

  const handleUpdateProduct = async (pid, updatedProduct) => {
    try {
      const response = await updateProduct(pid, updatedProduct);
      if (response && response.success) {
        toast.success("Product updated successfully");
        setIsModalOpen(false);
      } else {
        toast.error(`Failed to update product: ${response?.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product");
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover rounded-t-xl opacity-90 hover:opacity-100 transition cursor-pointer"
        />
      </Link>
      <div className="p-5 text-gray-800">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-lg font-bold text-gray-600 mb-4">${product.price}</p>

        <div className="flex space-x-4">
          {userRole === "admin" && location.pathname === "/Dashboard" ? (
            <button
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-yellow-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setIsModalOpen(true)}
            >
              Update
            </button>
          ) : (
            <>
              <Link
                to="/panier"
                className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Ajouter au Panier
              </Link>
              
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-gray-800 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-gray-800 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
            />
            <input
              type="text"
              name="image"
              value={updatedProduct.image}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-gray-800 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Image URL"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full shadow-md hover:bg-gray-400 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-yellow-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
