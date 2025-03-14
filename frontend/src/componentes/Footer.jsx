import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import Qr from "../assets/Qr.png";
import play from "../assets/playstore.png";
import appstore from "../assets/appStore.png";

function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Exclusive Subscribe Section */}
        <div>
          <h2 className="text-lg font-semibold">Exclusive</h2>
          <p className="text-sm text-gray-400">Get 10% off your first order</p>
          <div className="mt-3 flex items-center border border-gray-600 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-black text-white outline-none"
            />
            <button className="bg-white text-black px-4 py-2">➤</button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-lg font-semibold">Support</h2>
          <p className="text-sm text-gray-400">UPM, P2009, Marrakech 40000</p>
          <p className="text-sm text-gray-400">yahyaabouzekri123@gmail.com</p>
          <p className="text-sm text-gray-400">+212668562356</p>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-lg font-semibold">Account</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><Link to="/account" className="hover:text-gray-200">My Account</Link></li>
            <li><Link to="/login" className="hover:text-gray-200">Login / Register</Link></li>
            <li><Link to="/cart" className="hover:text-gray-200">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-gray-200">Wishlist</Link></li>
            <li><Link to="/shop" className="hover:text-gray-200">Shop</Link></li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div>
          <h2 className="text-lg font-semibold">Quick Link</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><Link to="/privacy-policy" className="hover:text-gray-200">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gray-200">Terms Of Use</Link></li>
            <li><Link to="/faq" className="hover:text-gray-200">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h2 className="text-lg font-semibold">Download App</h2>
          <p className="text-sm text-gray-400">Save $3 with App New User Only</p>
          <div className="mt-2">
            <img src={Qr} alt="QR Code" className="w-20 mb-2" />
            <div className="flex space-x-2">
              <img src={play} alt="Google Play" className="w-24" />
              <img src={appstore} alt="App Store" className="w-24" />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-400">© Copyright 2024. All rights reserved</p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
