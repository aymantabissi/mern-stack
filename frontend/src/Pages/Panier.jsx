import { useCartStore } from "../store/cart";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Panier() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  // Calculate total price and discount
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 60; // Fixed discount example (modify if needed)
  const finalTotal = totalPrice - discount;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <h1 className="text-4xl font-bold text-center mb-6">🛒 Votre Panier</h1>

      {cart.length === 0 ? (
        <div className="text-center bg-white p-8 shadow-lg rounded-lg">
          <p className="text-lg text-gray-600 mb-4">Votre panier est vide 😢</p>
          <Link to="/" className="text-blue-500 font-bold">Retour à la boutique</Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 🛍️ CART ITEMS */}
          <div className="md:col-span-2 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Panier ({cart.length})</h2>
            <ul>
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center border-b py-4">
                  {/* Image & Product Details */}
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-500">Size: EU 41 1/3</p>
                      <p className="text-sm text-orange-500 font-bold">JUMIA EXPRESS</p>
                    </div>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold">{item.price.toFixed(2)} Dhs</p>
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">➖</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">➕</button>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        toast.success("Produit retiré du panier");
                      }}
                      className="text-red-500 text-xl"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 🧾 ORDER SUMMARY */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Résumé du Panier</h2>
            <div className="flex justify-between text-lg">
              <p>Total articles ({cart.length})</p>
              <p>{totalPrice.toFixed(2)} Dhs</p>
            </div>
            <div className="flex justify-between text-green-600 font-bold">
              <p>Réduction Offerte par ADIDAS</p>
              <p>-{discount.toFixed(2)} Dhs</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <p>Sous-total</p>
              <p>{finalTotal.toFixed(2)} Dhs</p>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              ✅ Les articles ata9adaw Express sont éligibles à la livraison gratuite.
            </p>
            <button className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600">
              Commander ({finalTotal.toFixed(2)} Dhs)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Panier;
