import { useCartStore } from "../store/cart";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Panier() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const finalTotal = totalPrice + shipping;

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
        <div className="max-w-5xl mx-auto">
          {/* 🛍️ CART ITEMS */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Panier ({cart.length})</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Produit</th>
                  <th className="text-left py-2">Prix</th>
                  <th className="text-left py-2">Quantité</th>
                  <th className="text-left py-2">Sous-total</th>
                  <th className="text-left py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded" />
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-500">Size: EU 41 1/3</p>
                          <p className="text-sm text-orange-500 font-bold">JUMIA EXPRESS</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{item.price.toFixed(2)} Dhs</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">➖</button>
                        <span className="px-4">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">➕</button>
                      </div>
                    </td>
                    <td className="py-4">{(item.price * item.quantity).toFixed(2)} Dhs</td>
                    <td className="py-4">
                      <button
                        onClick={() => {
                          removeFromCart(item._id);
                          toast.success("Produit retiré du panier");
                        }}
                        className="text-red-500 text-xl"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-6">
              <Link to="/" className="text-blue-500 font-bold">Retour à la boutique</Link>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Mettre à jour le panier</button>
            </div>
          </div>

          {/* 🧾 ORDER SUMMARY */}
          <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">Résumé du Panier</h2>
            <div className="flex justify-between text-lg">
              <p>Sous-total</p>
              <p>{totalPrice.toFixed(2)} Dhs</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Livraison</p>
              <p>Gratuit</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <p>Total</p>
              <p>{finalTotal.toFixed(2)} Dhs</p>
            </div>
            <div className="mt-4">
              <input type="text" placeholder="Code promo" className="w-full p-2 border rounded" />
              <button className="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded">Appliquer le code promo</button>
            </div>
            <button className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600">
              Passer à la caisse ({finalTotal.toFixed(2)} Dhs)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Panier;