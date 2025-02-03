import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/Login", {
        email,
        password
      });

      console.log("conexxion réussie :", response.data);
      alert("conexxion réussie !");
      navigate("/"); // Redirige vers la page de connexion

    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.response?.data || error.message);
      alert("Erreur lors de l'inscription, vérifiez les informations.");
    }
  };
    
      




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <p className="text-gray-500 text-center mb-6">Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              onChange={(e) => setEmail(e.target.value)}

              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)}

              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="checkbox" className="accent-blue-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
            <Link to="/Register">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </Link>
       
        </p>
      </div>
    </div>
  )
}

export default Login
