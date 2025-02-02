
import React from 'react'

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Créer un compte</h2>
        <p className="text-gray-500 text-center mb-6">Rejoignez-nous dès aujourd'hui !</p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Nom</label>
            <input 
              type="text" 
              placeholder="Entrez votre nom" 
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input 
              type="email" 
              placeholder="Entrez votre email" 
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Mot de passe</label>
            <input 
              type="password" 
              placeholder="Créez un mot de passe" 
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Vous avez déjà un compte ? <a href="#" className="text-blue-600 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  )
}

export default Register

