import React, { useState } from 'react'
import SetQuantity from './SetQuantity';
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { increaseCartItemQuantity } from '../../store/actions';


const ItemContent = ({item}) => {
    const [currentQuantity, setCurrentQuantity] = useState(item.cartQuantity);
    const dispatch = useDispatch();

    const handleQtyIncrease = (cartItem) => {
        dispatch(increaseCartItemQuantity(cartItem, toast, currentQuantity, setCurrentQuantity));
    }

    return (
        <div className='grid md:grid-cols-5 grid-cols-4 md:text-[1rem] text-sm gap-4 items-center border border-slate-200 rounded-md lg:px-4 py-4 p-2'>
            <div className='md:col-span-2 justify-self-start flex flex-col gap-2'>

                <div className='flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start'>
                    <h3 className='lg:text-lg text-sm font-semibold text-slate-600'>
                        {item.name}
                    </h3>
                </div>

                <div>
                    <img 
                    src={item.image} 
                    alt={item.name} 
                    className='md:h-36 sm:h-24 h-12 w-full object-cover rounded-md'/>
                </div>

                <div>
                    <button
                    onClick={() => {}}
                    className='flex items-center font-semibold space-x-2 px-3 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-100 transition-colors duration-200 cursor-pointer'
                    >
                        <HiOutlineTrash size={16} className='text-rose-600'/>
                        Remove Item
                    </button>
                </div>

            </div>

            <div className='justify-self-center lg:text-lg text-sm text-slate-600 font-semibold'>
                {`$${Number(item.specialPrice).toFixed(2)}`}
            </div>

            <div className='justify-self-center'>
                <SetQuantity 
                quantity={currentQuantity}
                cardCounter={true}
                handleQtyIncrease={() => handleQtyIncrease(item)}
                handleQtyDecrease={() => {}}
                />
            </div>

            <div className='justify-self-center lg:text-lg text-sm text-slate-600 font-semibold'>
                {`$${(Number(item.specialPrice) * Number(item.cartQuantity)).toFixed(2)}`}
            </div>
        </div>
    )
}

export default ItemContent