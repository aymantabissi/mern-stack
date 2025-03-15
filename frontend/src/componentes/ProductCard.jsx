import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { useProductStore } from "../store/product";
import { toast } from "react-toastify";

function ProductCard({ product, userRole }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const location = useLocation();
  const { addToCart } = useCartStore();

  const handleDeleteProduct = async (pid) => {
    try {
      const { success, message } = await deleteProduct(pid);
      if (success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(`Failed to delete product: ${message}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product");
    }
  };

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

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product exists in cart
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify the navbar to update cart count
    window.dispatchEvent(new Event("cartUpdated"));

    // Show notification
    toast.success("Produit ajouté au panier 🛒");
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover rounded-t-xl opacity-90 hover:opacity-100 transition cursor-pointer"
        />
      </Link>
      <div className="p-5 text-white">
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
        <p className="text-lg text-gray-300 mb-4">${product.price}</p>

        <div className="flex space-x-4">
          {userRole === "admin" && location.pathname === "/Dashbord" ? (
            <>
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setIsModalOpen(true)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={handleAddToCart}
              >
                Ajouter au Panier
              </button>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              className="w-full p-2 border rounded bg-gray-800 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              className="w-full p-2 border rounded bg-gray-800 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
            />
            <input
              type="text"
              name="image"
              value={updatedProduct.image}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              className="w-full p-2 border rounded bg-gray-800 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Image URL"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-700 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
