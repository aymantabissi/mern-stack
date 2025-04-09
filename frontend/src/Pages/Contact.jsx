import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16 lg:px-32">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span>Home / </span>
        <span className="text-black font-semibold">Contact</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info Section */}
        <div className="bg-white p-8 shadow-lg rounded-xl border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="text-red-500 text-3xl mr-4">
              <FaPhoneAlt />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-500">We are available 24/7, 7 days a week.</p>
              <p className="text-gray-700 font-medium mt-2">Phone: +880611122222</p>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex items-center">
            <div className="text-red-500 text-3xl mr-4">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-500">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-gray-700 font-medium mt-2">customer@exclusive.com</p>
              <p className="text-gray-700 font-medium">support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Your Name *" 
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-400 outline-none w-full"
              />
              <input 
                type="email" 
                placeholder="Your Email *" 
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-400 outline-none w-full"
              />
              <input 
                type="text" 
                placeholder="Your Phone *" 
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-400 outline-none w-full"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-red-400 outline-none w-full"
            ></textarea>
            <button
              type="submit"
              className="w-full p-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-500 italic">Our Location</h2>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1119.169130114922!2d-9.207553505068299!3d32.305865324675075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac217ec53d682d%3A0xccc47a648d807676!2scaf%C3%A9%20lbeldi%20FSY!5e0!3m2!1sar!2sma!4v1738527649699!5m2!1sar!2sma" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            aria-hidden="false" 
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;