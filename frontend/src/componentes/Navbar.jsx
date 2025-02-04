import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaRegUser, FaShopify } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";


function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900">
      <ul className="text-center text-xl p-20">
        <Link to="/">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Home
          </li>
        </Link>
        <Link to="/CreateProduct">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            CreateProduct
          </li>
        </Link>
        <Link to="/Login">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Login
          </li>
        </Link>
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1 bg-slate-900 transition">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">
            <FaShopify />
          </span>
          <span className="self-center text-2xl font-semibold whitespace-nowrap ml-2">At9adaw</span>
        </div>
        <div className="lg:flex md:flex flex-1 items-center justify-end font-normal hidden">
          <ul className="flex gap-4 mr-16 text-[18px]">
            <Link to="/">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/CreateProduct">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                CreateProduct
              </li>
            </Link>
            <Link to="/Login">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer flex items-center gap-2">
                <FaRegUser /> <span>Se Connecter</span>
              </li>
            </Link>
            <Link to="/Panier">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer flex items-center gap-2">
                <MdOutlineShoppingCart /> <span>Panier</span>
              </li>
            </Link>
          </ul>
        </div>
        <div>{click && content}</div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
