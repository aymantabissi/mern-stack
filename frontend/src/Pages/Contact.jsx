import React from 'react';

function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-center items-center p-10 w-full">
        <h1 className="text-4xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 hover:from-orange-500 hover:to-blue-400 transition duration-500">
          Besoin d'aide ?
        </h1>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-16 lg:px-32">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-blue-600 italic">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Si vous avez des questions ou besoin d'assistance, 
            n'hésitez pas à discuter avec nous du Lundi au Samedi (09H00 à 19H00).
          </p>
          <hr className="my-4 border-gray-300" />

          <div className="text-lg text-gray-700">
            <ul className="space-y-4">
              <li>
                <span className="font-semibold">📍 Adresse:</span> 
                <a href="#" className="text-blue-600 hover:underline ml-2">Rue 1 Jamma Kolea Safi</a>
              </li>
              <li>
                <span className="font-semibold">📞 Téléphone:</span> 
                <span className="ml-2">0522041920</span>
              </li>
              <li>
                <span className="font-semibold">📧 Email:</span>
                <a href="mailto:Att9adaw@gmail.com" className="text-blue-600 hover:underline ml-2">
                  Att9adaw@gmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold">🌍 Site Web:</span>
                <a href="https://www.att9adaw.com" className="text-blue-600 hover:underline ml-2">
                  www.att9adaw.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 italic">Envoyez-nous un message</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="border border-gray-300 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input 
              type="email" 
              placeholder="Votre email" 
              className="border border-gray-300 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              placeholder="Votre message" 
              rows="4"
              className="border border-gray-300 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-500 italic">Notre emplacement</h2>
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
