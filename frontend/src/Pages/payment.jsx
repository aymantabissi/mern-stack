import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCcVisa, FaCcMastercard, FaCcDiscover, FaCcPaypal } from 'react-icons/fa';  // Import Font Awesome icons

function Payment() {
  const location = useLocation();
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (location.state && location.state.shippingInfo) {
      setShippingInfo(location.state.shippingInfo);
    }
  }, [location.state]);

  if (!shippingInfo) {
    return <p className="text-center text-xl text-gray-700">Loading...</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
      alert("All payment fields are required.");
      return;
    }

    alert("Payment successful! Your order is confirmed.");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-300">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Payment Details</h2>

      <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Information</h3>
        <div className="space-y-2 text-gray-800">
          <p><strong>Name:</strong> {shippingInfo.name}</p>
          <p><strong>Address:</strong> {shippingInfo.address}</p>
          <p><strong>City:</strong> {shippingInfo.city}</p>
          <p><strong>Postal Code:</strong> {shippingInfo.postalCode}</p>
          <p><strong>Country:</strong> {shippingInfo.country}</p>
          <p><strong>Phone:</strong> {shippingInfo.phone}</p>
        </div>
      </div>

      <form onSubmit={handlePaymentSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Card Number</label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition ease-in-out duration-300"
              required
              placeholder="1234 5678 9876 5432"
            />
            <div className="absolute top-3 right-4 flex space-x-2">
              <FaCcVisa className="text-indigo-600 text-2xl" />
              <FaCcMastercard className="text-indigo-600 text-2xl" />
              <FaCcDiscover className="text-indigo-600 text-2xl" />
              <FaCcPaypal className="text-indigo-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition ease-in-out duration-300"
              required
              placeholder="MM/YY"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">CVV</label>
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleInputChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition ease-in-out duration-300"
              required
              placeholder="123"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
