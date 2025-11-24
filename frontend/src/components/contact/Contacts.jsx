import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contacts = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen absolute inset-0 bg-cover bg-center bg-image'
      style={{ backgroundImage: "url('https://spray-one.com/wp-content/uploads/2023/07/contact.png')" }}>
      <div className='text-center space-y-4 backdrop-blur-sm rounded-lg shadow-lg p-8'>
        <h1 className='text-4xl font-bold text-slate-800'>Contact Us</h1>
        <p className='font-semibold text-slate-800'>Please fill out the form fields or contact us directly!</p>

        <div className='space-y-1'>
          <label htmlFor="name" className='block text-gray-800 text-lg text-left'>
            Name
          </label>
          <input 
          required
          type="text" 
          id='name' 
          className='block w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg bg-gray-300 opacity-60'
          />
        </div>
        <div className='space-y-1'>
          <label htmlFor="email" className='block text-gray-800 text-lg text-left'>
            Email
          </label>
          <input 
          required
          type="email" 
          id='name' 
          className='block w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg bg-gray-300 opacity-60'
          />
        </div>
        <div className='space-y-1'>
          <label htmlFor="message" className='block text-gray-800 text-lg text-left'>
            Message
          </label>
          <textarea 
          required
          rows={4} 
          id='message' 
          className='block w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg bg-gray-300 opacity-60'
          />
        </div>

        <div className='flex items-center px-8 text-slate-800 mt-7'>
          <FaPhone />
          <span className='ml-4'>+359 883 407 180</span> 
        </div>
        <div className='flex items-center px-8 text-slate-800'>
          <FaEnvelope />
          <span className='ml-4'>roskonenov@gmail.com</span> 
        </div>
        <div className='flex items-center px-8 text-slate-800'>
          <FaMapMarkerAlt />
          <span className='ml-4'>Bulgaria, Stara Zagora, Slavyansky blvd. 15</span> 
        </div>
        
      </div>

    </div>
  )
}

export default Contacts;