import React from 'react'
import { BsCartXFill } from "react-icons/bs";
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';


const EmptyCart = () => {
    return (
        <div className='min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center'>
            <section className='flex flex-col gap-4 justify-center items-center'>
                <BsCartXFill size={80} className='text-slate-600' />
                <h1 className='font-bold text-3xl text-slate-700'>
                    Your cart is empty
                </h1>
                <p className='text-slate-600 text-lg font-semibold'>
                    Add some products to get started
                </p>
            </section>
            <div className='mt-10'>
                <Link to='/' className='flex gap-3 items-center text-blue-500 hover:text-blue-700 transition'>
                    <MdArrowBack size={16} className='font-bold h-full mt-0.5'/>
                    <span className='font-medium'>Start shopping</span>
                </Link>
            </div>
        </div>
    )
}

export default EmptyCart