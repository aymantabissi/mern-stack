import React from 'react'

function Contact() {
  return (
    <div>
      <div className='bg-slate-800 flex justify-center items-center p-10 mx-auto w-full'>
        <h1 className='text-3xl text-white font-bold hover:text-orange-500 cursor-pointer'>Besoin d'aide ?</h1>
      </div>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4'>
        <div>
          <h1 className='text-3xl font-bold mb-4 flex justify-center items-center'>Contact Us</h1>
          <p className='w-full md:w-[700px] text-lg'>
            Si vous avez des questions ou besoin d'assistance, 
            n'hésitez pas à discuter avec nous du Lundi au Samedi ( 09H00 à 19H00)
          </p>
          <hr className='my-4 border-gray-300' />
          
          <div className='font-bold text-lg'>
            <ul className='space-y-3'>
              <li>
                <span className='font-semibold'>Adresse:</span> 
                <a href='#' className='text-blue-600 hover:underline'>rue 1 Jamma kolea safi</a>
              </li>
              <li>
                <span className='font-semibold'>Phone:</span> 
                <span> 0522041920</span>
              </li>
              <li>
                <span className='font-semibold'>Email:</span>
                <a href='mailto:Att9adaw@gmail.com' className='text-blue-600 hover:underline'>
                  Att9adaw@gmail.com
                </a>
              </li>
              <li>
                <span className='font-semibold'>Web:</span>
                <a href='https://www.att9adaw.com' className='text-blue-600 hover:underline'>
                  www.att9adaw.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='bg-gray-100 p-6 rounded-md shadow-lg'>
          <div className='space-y-4'>
            <input 
              type="text" 
              placeholder='Enter your name' 
              className='border-2 border-dark-400 w-full p-2 rounded-md'
            />
            <input 
              type="email" 
              placeholder='Enter your email' 
              className='border-2 border-dark-400 w-full p-2 rounded-md'
            />
            <textarea
              placeholder='Enter your message' 
              rows="4"
              className='border-2 border-dark-400 w-full p-2 rounded-md'
            />
            <button
              type="submit"
              className='w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition'
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Google Map Embed Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Our Location</h2>
        <div className="w-full h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1119.169130114922!2d-9.207553505068299!3d32.305865324675075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac217ec53d682d%3A0xccc47a648d807676!2scaf%C3%A9%20lbeldi%20FSY!5e0!3m2!1sar!2sma!4v1738527649699!5m2!1sar!2sma" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{border: 0}} 
            allowFullScreen="" 
            aria-hidden="false" 
            tabIndex="0"
          ></iframe>
        </div>
      </div>

    </div>
  )
}

export default Contact


