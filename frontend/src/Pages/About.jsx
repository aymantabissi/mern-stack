import digital from "../assets/digital.jpeg";
import { MdHighQuality } from "react-icons/md";
import { TbShoppingCartDollar } from "react-icons/tb";
import { AiFillGift, AiFillProduct } from "react-icons/ai";

function About() {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <div className='flex justify-center items-center mx-auto w-full p-10'>
        <h1 className='italic text-orange-600 underline text-3xl font-extrabold hover:text-orange-500 transition duration-300'>Qui sommes-nous?</h1>
      </div>
      
      {/* Image Section */}
      <div className='mx-auto flex justify-center items-center w-full'>
        <img src={digital} alt="digital" className="w-full max-w-[1200px] h-[250px] object-cover rounded-lg shadow-lg" />
      </div>

      {/* Intro Text */}
      <div className='flex justify-center items-center text-center p-10'>
        <p className='italic font-semibold text-2xl text-gray-700'>Un marché de professionnels ouvert aux amateurs</p>
      </div>

      {/* Our Expertise Section */}
      <div className='text-center max-w-[1300px] mx-auto p-10'>
        <h1 className='italic font-bold text-3xl text-orange-600 mb-4'>Notre savoir-faire</h1>
        <p className='text-lg text-gray-700'>
          Conscients que la recherche de grands crus peut savérer très délicate pour les amateurs, que ce soit sur Internet,
          chez des cavistes ou en grande distribution, nous mettons accent sur les points suivants, afin de vous satisfaire au mieux.
        </p>
      </div>

      {/* Features Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-[1000px] mx-auto p-10">
        {/* Card 1 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition-all hover:scale-105 hover:shadow-2xl">
          <TbShoppingCartDollar className="text-5xl text-orange-500 mb-3" />
          <h2 className="font-bold text-lg text-gray-800">PRIX TRÈS COMPÉTITIFS</h2>
          <p className="text-sm text-gray-600">
            Notre activité de négociants et notre professionnalisme nous permettent de vous proposer des tarifs très avantageux sur le marché.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition-all hover:scale-105 hover:shadow-2xl">
          <AiFillProduct className="text-5xl text-orange-500 mb-3" />
          <h2 className="font-bold text-lg text-gray-800">UNE OFFRE EXCEPTIONNELLE DE GRANDS CRUS</h2>
          <p className="text-sm text-gray-600">
            Nous sélectionnons des vins parmi les domaines les plus prestigieux au monde. Nous possédons un stock de 4 000 références et 50 000 bouteilles.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition-all hover:scale-105 hover:shadow-2xl">
          <MdHighQuality className="text-5xl text-orange-500 mb-3" />
          <h2 className="font-bold text-lg text-gray-800">DES BOUTEILLES D’UNE GRANDE QUALITÉ</h2>
          <p className="text-sm text-gray-600">
            Notre expertise et nos relations avec les grands châteaux nous permettent de garantir des produits de qualité irréprochable.
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg transition-all hover:scale-105 hover:shadow-2xl">
          <AiFillGift className="text-5xl text-orange-500 mb-3" />
          <h2 className="font-bold text-lg text-gray-800">DISPONIBILITÉ IMMÉDIATE DES BOUTEILLES</h2>
          <p className="text-sm text-gray-600">
            Tous les vins en vente sont stockés dans notre cave et disponibles immédiatement. Les stocks sont mis à jour plusieurs fois par jour.
          </p>
        </div>
      </div>

      {/* CTA Button Section */}
      <div className='flex justify-center items-center mt-10'>
        <button className="px-8 py-3 bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition duration-300">
          Explorez notre collection
        </button>
      </div>
    </div>
  );
}

export default About;
