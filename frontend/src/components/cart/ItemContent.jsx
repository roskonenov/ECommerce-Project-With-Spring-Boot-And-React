import React, { useState, useEffect } from 'react'
import SetQuantity from './SetQuantity';
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { decreaseCartItemQuantity, increaseCartItemQuantity, removeFromCart } from '../../store/actions';
import { currencyFormatter } from '../../utils/CurrencyFormatter';
import truncateText from '../../utils/truncateText';


const ItemContent = ({ item }) => {
    const [currentQuantity, setCurrentQuantity] = useState(item.cartQuantity);
    const dispatch = useDispatch();

    // sync currentQuantity when item prop changes (e.g., after remove/update from another component)
    useEffect(() => {
        setCurrentQuantity(item.cartQuantity);
    }, [item.cartQuantity, item.id]);

    const handleQtyIncrease = (cartItem) => {
        dispatch(increaseCartItemQuantity(cartItem, toast, currentQuantity, setCurrentQuantity));
    }

    const handleQtyDecrease = (cartItem) => {
        const newQuantity = cartItem.cartQuantity - 1;
        if (newQuantity <= 0) return;
        setCurrentQuantity(newQuantity);
        dispatch(decreaseCartItemQuantity(cartItem, newQuantity))
    }

    const removeItemFromCart = (item) => {
        dispatch(removeFromCart(item, toast));
    }

    return (
        <div className='grid md:grid-cols-5 grid-cols-4 md:text-[1rem] text-sm gap-4 items-center border border-slate-200 rounded-md lg:px-4 py-4 p-2'>
            <div className='md:col-span-2 justify-self-start flex flex-col gap-2'>

                <div className='flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start'>
                    <h3 className='lg:text-lg text-sm font-semibold text-slate-600'>
                        {truncateText(item.name)}
                    </h3>
                </div>

                <div>
                    <img
                        src={item.image}
                        alt={item.name}
                        className='md:h-36 sm:h-24 h-12 w-full object-cover rounded-md' />
                </div>

                <div>
                    <button
                        onClick={() => removeItemFromCart(item)}
                        className='flex items-center font-semibold space-x-2 px-3 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-100 transition-colors duration-200 cursor-pointer'
                    >
                        <HiOutlineTrash size={16} className='text-rose-600' />
                        Remove Item
                    </button>
                </div>

            </div>

            <div className='justify-self-center lg:text-lg text-sm text-slate-600 font-semibold'>
                {currencyFormatter(item.specialPrice)}
            </div>

            <div className='justify-self-center'>
                <SetQuantity
                    quantity={item.quantity}
                    cartQuantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={() => handleQtyIncrease(item)}
                    handleQtyDecrease={() => handleQtyDecrease(item)}
                />
            </div>

            <div className='justify-self-center lg:text-lg text-sm text-slate-600 font-semibold'>
                {currencyFormatter(item.specialPrice * item.cartQuantity)}
            </div>
        </div>
    )
}

export default ItemContent