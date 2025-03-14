import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaRegUser, FaShopify} from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import jwt_decode from "jwt-decode";

function Navbar() {
  const [click, setClick] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Update user role when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.role);
    }
  }, []); // Dependency fixed

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    navigate("/login");
  };

  const handleClick = () => setClick(!click);

  return (
    <nav className="bg-black text-white fixed w-full z-50 shadow-lg">
      <div className="h-16 flex justify-between items-center px-6 md:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-3xl font-bold">
            <FaShopify />
          </span>
          <span className="text-2xl font-semibold ml-2">At9adaw</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-[18px]">
          <Link to="/" className="hover:text-fuchsia-600 transition">Home</Link>

          {userRole === "admin" && (
            <>
              <Link to="/Dashbord" className="hover:text-fuchsia-600 transition">Dashboard</Link>
              <Link to="/CreateProduct" className="hover:text-fuchsia-600 transition">Create Product</Link>
            </>
          )}

          <Link to="/Panier" className="hover:text-fuchsia-600 transition flex items-center gap-1">
            <MdOutlineShoppingCart /> Panier
          </Link>

          {userRole ? (
            <button onClick={handleLogout} className="hover:text-red-500 transition flex items-center gap-1">
              <FaRegUser /> Logout
            </button>
          ) : (
            <Link to="/Login" className="hover:text-fuchsia-600 transition flex items-center gap-1">
              <FaRegUser /> Se Connecter
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden transition text-xl" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`${click ? "block" : "hidden"} md:hidden bg-black text-white`}>
        <ul className="flex flex-col items-center py-4 space-y-3">
          <Link to="/" className="hover:text-fuchsia-600 transition">Home</Link>

          {userRole === "admin" && (
            <>
              <Link to="/Dashbord" className="hover:text-fuchsia-600 transition">Dashboard</Link>
              <Link to="/CreateProduct" className="hover:text-fuchsia-600 transition">Create Product</Link>
            </>
          )}

          <Link to="/Panier" className="hover:text-fuchsia-600 transition flex items-center gap-1">
            <MdOutlineShoppingCart /> Panier
          </Link>

          {userRole ? (
            <button onClick={handleLogout} className="hover:text-red-500 transition flex items-center gap-1">
              <FaRegUser /> Logout
            </button>
          ) : (
            <Link to="/Login" className="hover:text-fuchsia-600 transition flex items-center gap-1">
              <FaRegUser /> Se Connecter
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
