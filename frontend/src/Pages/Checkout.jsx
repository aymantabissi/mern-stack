import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import react-toastify
import { FaCreditCard, FaCashRegister } from "react-icons/fa"; // Import Cash Register icon for Cash on Delivery

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the product passed from the Details page
  const product = location.state?.product;

  // States to track shipping info and payment method
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [currentStep, setCurrentStep] = useState(1); // Track current step (1 for personal info, 2 for payment)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    // Validate personal info before moving to the payment step
    for (let key in shippingInfo) {
      if (!shippingInfo[key]) {
        alert(`${key} is required`);
        return;
      }
    }

    // Show success toast
    toast.success("Personal Information Successfully Submitted!");

    // Move to the payment step
    setCurrentStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if the payment method is selected
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // After validation, navigate to the payment page
    navigate("/payment", { state: { shippingInfo, product, paymentMethod } });
  };

  // Calculate total price (including shipping)
  const totalPrice = product?.price;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {currentStep === 1 ? "Billing Details" : "Payment Details"}
        </h2>

        {/* Step 1: Personal Info Form */}
        {currentStep === 1 && (
          <form onSubmit={handleNextStep} className="space-y-8">
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Next Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Payment Method</h3>
              <div className="flex items-center mt-4 space-x-6">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  onChange={() => setPaymentMethod("cashOnDelivery")}
                  checked={paymentMethod === "cashOnDelivery"}
                  className="mr-2"
                />
                <label htmlFor="cashOnDelivery" className="text-lg text-gray-700">
                  <FaCashRegister className="text-green-500 inline-block mr-2" />
                  Cash on Delivery
                </label>
              </div>
              <div className="flex items-center mt-4 space-x-6">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  onChange={() => setPaymentMethod("creditCard")}
                  checked={paymentMethod === "creditCard"}
                  className="mr-2"
                />
                <label htmlFor="creditCard" className="text-lg text-gray-700">
                  <FaCreditCard className="text-yellow-500 inline-block mr-2" />
                  Credit Card
                </label>
              </div>
            </div>

            {/* Credit Card Information */}
            {paymentMethod === "creditCard" && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-lg font-semibold text-gray-700">Credit Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9876 5432"
                    className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="mt-4 flex gap-6">
                  <div className="w-1/2">
                    <label className="block text-lg font-semibold text-gray-700">CVV</label>
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-lg font-semibold text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Order Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Place Order
              </button>
            </div>
          </form>
        )}

        {/* Product Image and Total */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
          <div className="flex items-center space-x-4 mt-4">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-20 h-20 object-cover rounded-md shadow-md"
            />
            <div>
              <p className="font-semibold text-gray-700">{product?.name}</p>
              <p className="text-sm text-gray-500">${product?.price}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
