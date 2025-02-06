import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaRegUser, FaShopify } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import jwt_decode from "jwt-decode";

function Navbar() {
  const [click, setClick] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Update the user role when the component mounts or the token changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.role);
    }
  }, [localStorage.getItem("token")]); // Dependency on token change

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null); // Immediately update the userRole state
    navigate("/login");
  };

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <nav>
      <div className="h-16 flex justify-between items-center z-50 text-white lg:py-5 px-20 py-4 flex-1 bg-slate-900 transition">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">
            <FaShopify />
          </span>
          <span className="self-center text-2xl font-semibold whitespace-nowrap ml-2">At9adaw</span>
        </div>

        {/* Desktop Menu */}
        <div className="lg:flex md:flex flex-1 items-center justify-end font-normal hidden">
          <ul className="flex gap-4 mr-16 text-[18px]">
            <Link to="/">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                Home
              </li>
            </Link>

            {userRole === "admin" && (
              <Link to="/Dashbord">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  Dashboard
                </li>
              </Link>
            )}

            {/* Only show CreateProduct link for admin */}
            {userRole === "admin" && (
              <Link to="/CreateProduct">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  CreateProduct
                </li>
              </Link>
            )}

            <Link to="/Panier">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer flex items-center gap-2">
                <MdOutlineShoppingCart /> <span>Panier</span>
              </li>
            </Link>

            {userRole ? (
              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition border-b-2 border-slate-900 hover:border-red-500 cursor-pointer flex items-center gap-2"
              >
                <FaRegUser /> <span>Logout</span>
              </button>
            ) : (
              <Link to="/Login">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer flex items-center gap-2">
                  <FaRegUser /> <span>Se Connecter</span>
                </li>
              </Link>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={click ? "block lg:hidden bg-slate-900 text-white" : "hidden"}>
        <ul className="flex flex-col items-center py-4">
          <Link to="/">
            <li className="hover:text-fuchsia-600 py-2">Home</li>
          </Link>

          {userRole === "admin" && (
            <Link to="/Dashbord">
              <li className="hover:text-fuchsia-600 py-2">Dashboard</li>
            </Link>
          )}

          {/* Only show CreateProduct link for admin */}
          {userRole === "admin" && (
            <Link to="/CreateProduct">
              <li className="hover:text-fuchsia-600 py-2">CreateProduct</li>
            </Link>
          )}

          <Link to="/Panier">
            <li className="hover:text-fuchsia-600 py-2 flex items-center gap-2">
              <MdOutlineShoppingCart /> <span>Panier</span>
            </li>
          </Link>

          {userRole ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-500 py-2 flex items-center gap-2"
            >
              <FaRegUser /> <span>Logout</span>
            </button>
          ) : (
            <Link to="/Login">
              <li className="hover:text-fuchsia-600 py-2 flex items-center gap-2">
                <FaRegUser /> <span>Se Connecter</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
