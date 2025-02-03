import React from 'react'
import digital from "../assets/digital.jpeg"

function About() {
  return (
    <div>
      <div className='bg-slate-800  flex justify-center items-center text-white mx-auto w-full p-10'>
        <h1 className='text-white underline text-3xl font-bold hover:text-orange-500'> Qui somme nous?</h1>
      </div>
      <div className='mx-auto flex justify-center items-center '>
         <img src={digital} alt="digital" className="h-[200px] object-contain w-[1200px] " />
        </div>


  
      
    </div>
  )
}

export default About
