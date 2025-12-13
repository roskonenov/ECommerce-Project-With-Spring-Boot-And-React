import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorPage = ({message}) => {
  return (
    <div className='flex flex-col space-y-3 justify-center items-center px-6 py-16'>
        <FaExclamationTriangle className='text-6xl text-red-500'/>
        <p className='text-gray-600 text-2xl '>
            {message ? message : 'An Unexpected Error Occured!'}
        </p>
    </div>
  )
}

export default ErrorPage