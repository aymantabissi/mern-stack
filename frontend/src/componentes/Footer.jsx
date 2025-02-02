import React from 'react'
import { FaShopify } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white rounded-lg shadow-md mt-12">
      <div className="w-full max-w-screen-xl mx-auto p-6 sm:p-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <span className='text-3xl font-bold'><FaShopify/> </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">At9adaw</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0 space-x-3">
          <Link to="/About">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                About
              </li>
            </Link>
            <Link to="/Contact">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                Contact us
              </li>
            </Link>
            <li>
              <a href="#" className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer ">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="text-center">
          <span className="block text-sm text-gray-400">© 2025 <a href="https://flowbite.com/" className="hover:text-white transition-colors duration-300">At9adaw</a>. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
