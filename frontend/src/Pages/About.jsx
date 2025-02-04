import React from 'react';
import digital from "../assets/digital.jpeg";
import { MdHighQuality } from "react-icons/md";
import { TbShoppingCartDollar } from "react-icons/tb";
import { AiFillGift } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";

function About() {
  return (
    <div>
      <div className='flex justify-center items-center mx-auto w-full p-10'>
        <h1 className='italic text-orange-300 underline text-3xl font-bold hover:text-orange-500'>Qui sommes-nous?</h1>
      </div>
      
      <div className='mx-auto flex justify-center items-center w-full'>
        <img src={digital} alt="digital" className="w-full max-w-[1200px] h-[250px] object-cover" />
      </div>

      <div className='flex justify-center items-center text-center p-10'>
        <p className='italic font-bold text-2xl'>Un marché de professionnels ouvert aux amateurs</p>
      </div>

      <div className='text-center max-w-[1300px] mx-auto p-10'>
        <h1 className='italic font-bold text-3xl text-orange-300 mb-4'>Notre savoir-faire</h1>
        <p className='text-lg'>
          Conscients que la recherche de grands crus peut s'avérer très délicate pour les amateurs, que ce soit sur Internet,
          chez des cavistes ou en grande distribution, nous mettons l'accent sur les points suivants, afin de vous satisfaire au mieux.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 text-center max-w-[1000px] mx-auto p-10">
        <div className="flex flex-col items-center">
          <TbShoppingCartDollar className="text-5xl text-orange-400 mb-3" />
          <h2 className="font-bold text-lg">PRIX TRÈS COMPÉTITIFS</h2>
          <p className="text-sm">
            Notre activité de négociants et notre professionnalisme nous permettent de vous proposer des tarifs très avantageux sur le marché.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <AiFillProduct className="text-5xl text-orange-400 mb-3" />
          <h2 className="font-bold text-lg">UNE OFFRE EXCEPTIONNELLE DE GRANDS CRUS</h2>
          <p className="text-sm">
            Nous sélectionnons des vins parmi les domaines les plus prestigieux au monde. Nous possédons un stock de 4 000 références et 50 000 bouteilles.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <MdHighQuality className="text-5xl text-orange-400 mb-3" />
          <h2 className="font-bold text-lg">DES BOUTEILLES D’UNE GRANDE QUALITÉ</h2>
          <p className="text-sm">
            Notre expertise et nos relations avec les grands châteaux nous permettent de garantir des produits de qualité irréprochable.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <AiFillGift className="text-5xl text-orange-400 mb-3" />
          <h2 className="font-bold text-lg">DISPONIBILITÉ IMMÉDIATE DES BOUTEILLES</h2>
          <p className="text-sm">
            Tous les vins en vente sont stockés dans notre cave et disponibles immédiatement. Les stocks sont mis à jour plusieurs fois par jour.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
