import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [age, setAge] = useState(""); // New state for age
  const [gender,setGender]=useState("");
  const [country, setCountry] = useState(""); // New state for country
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password || !role || !age || !country || !gender) {
      toast.error("❌ Veuillez remplir tous les champs !");
      return;
    }

    try {
      // Send request to backend API
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        age,
        gender,
        country,
        password,
        role,
      });

      // Handle successful registration
      toast.success("✅ Inscription réussie !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      // Handle error from backend
      console.error(error);
      let errorMessage =
        error.response?.data?.message || "❌ Erreur lors de l'inscription !";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        {/* LOGO */}
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891419.png"
            alt="E-Commerce Logo"
            className="w-16 mx-auto mb-3"
          />
          <h2 className="text-3xl font-extrabold text-gray-700">Créer un compte</h2>
          <p className="text-gray-500">Rejoignez-nous dès aujourd`hui !</p>
        </div>

        {/* REGISTER FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Nom</label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Âge</label>
            <input
              type="number"
              placeholder="Entrez votre âge"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Genre</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="">Sélectionnez votre genre</option>
              <option value="Male">Homme</option>
              <option value="Female">Femme</option>
              <option value="Other">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Pays</label>
            <input
              type="text"
              placeholder="Entrez votre pays"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Mot de passe</label>
            <input
              type="password"
              placeholder="Créez un mot de passe"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            S`inscrire
          </button>
        </form>

        {/* OR LINE */}
        <div className="flex items-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500">ou</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* SOCIAL REGISTER */}
        <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          S`inscrire avec Google
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-600 mt-4">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Connectez-vous ici
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
