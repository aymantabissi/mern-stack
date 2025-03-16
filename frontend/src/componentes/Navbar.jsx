import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineLogout, AiOutlineStar } from "react-icons/ai";
import { BsBox, BsXCircle } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import jwt_decode from "jwt-decode";
import { useCartStore } from "../store/cart";
import { useProductStore } from "../store/product";

function Navbar() {
  const { fetchProduct, products } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(); // Fetch products on mount
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.role);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    }, 500); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (id) => {
    setSearchTerm(""); // Clear search input after selection
    navigate(`/product/${id}`); // Navigate to the selected product page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    navigate("/login");
  };

  return (
    <header className="w-full shadow-md">
      <div className="bg-black text-white text-center py-2 text-sm">
        Soldes <span>d'été </span> : -50% sur les maillots de bain + livraison express gratuite !{" "}
        <a href="#" className="font-bold underline">Achetez maintenant</a>
      </div>

      <nav className="bg-white py-4 px-6 md:px-20 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Exclusif</Link>

        <ul className="hidden md:flex gap-8 text-lg">
          <Link to="/" className="hover:text-red-500 transition">Accueil</Link>
          <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
          <Link to="/about" className="hover:text-red-500 transition">À propos</Link>
          <Link to="/register" className="hover:text-red-500 transition">S'inscrire</Link>
        </ul>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Que cherchez-vous ?"
              className="border rounded-full py-2 px-4 w-64 outline-none"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</button>
            
            {/* Search Results Dropdown */}
            {filteredProducts.length > 0 && (
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                {filteredProducts.map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="block text-left w-full px-4 py-2 hover:bg-gray-100 transition"
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/Panier" className="relative text-xl">
            <MdOutlineShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-xl hover:text-red-500">
              <FaRegUser />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2">
                <Link to="/account" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                  <IoPersonOutline className="mr-3" /> Mon compte
                </Link>
                <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                  <BsBox className="mr-3" /> Mes commandes
                </Link>
                <Link to="/cancellations" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                  <BsXCircle className="mr-3" /> Annulations
                </Link>
                <Link to="/reviews" className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                  <AiOutlineStar className="mr-3" /> Avis
                </Link>
                <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-red-500 hover:bg-gray-100 transition">
                  <AiOutlineLogout className="mr-3" /> Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
