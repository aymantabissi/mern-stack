import { useCartStore } from "../store/cart";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Panier() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const finalTotal = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <h1 className="text-4xl font-bold text-center mb-6">🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center bg-white p-8 shadow-lg rounded-lg">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty 😢</p>
          <Link to="/" className="text-blue-500 font-bold">Return to Shop</Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Subtotal</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-4 flex items-center">
                      <img 
                        src={item.image ? `http://localhost:5000${item.image}` : "http://localhost:5000/uploads/default-image.jpg"} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-md shadow-md mr-4" 
                      />
                      {item.name}
                    </td>
                    <td className="p-4 font-semibold">${item.price}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        className="border p-2 rounded-md w-16 text-center"
                        value={item.quantity}
                        min="1"
                        max="10"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          updateQuantity(item._id, Math.max(1, Math.min(10, newQuantity)));
                        }}
                      />
                    </td>
                    <td className="p-4 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          removeFromCart(item._id);
                          toast.success("Product removed from cart");
                        }}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-6">
              <Link to="/" className="border px-4 py-2 rounded-md shadow-md hover:bg-gray-200">Return To Shop</Link>
              <button className="border px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">Update Cart</button>
            </div>
          </div>

          <div className="mt-6 flex gap-6">
            <div className="flex-1">
              <input type="text" placeholder="Coupon Code" className="border p-3 w-full rounded-md" />
              <button className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition">Apply Coupon</button>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
              <div className="flex justify-between text-lg">
                <p>Subtotal:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-lg">
                <p>Shipping:</p>
                <p>Free</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-xl font-semibold">
                <p>Total:</p>
                <p>${finalTotal.toFixed(2)}</p>
              </div>
              <button className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Panier;
