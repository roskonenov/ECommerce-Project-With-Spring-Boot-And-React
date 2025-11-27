import React from 'react'
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";

const SetQuantity = ({
    quantity,
    cartQuantity,
    cardCounter,
    handleQtyIncrease,
    handleQtyDecrease
}) => {
    return (
        <div className='flex gap-8 items-center'>
            {cardCounter ? null : <div className='font-semibold'>QUANTITY</div>}
            <div className='flex md:flex-row flex-col gap-4 items-stretch lg:text-xl text-sm'>
                <button
                    disabled={cartQuantity >= quantity}
                    className={`text-slate-800 rounded-md ${cartQuantity >= quantity ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handleQtyIncrease}
                >
                    <FaRegPlusSquare size={24} className='w-full' />
                </button>

                <div className='w-10 text-red-500 font-semibold text-center'>{cartQuantity}</div>

                <button
                    disabled={cartQuantity <= 1}
                    className={`text-slate-800 rounded-md ${cartQuantity <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handleQtyDecrease}
                >
                    <FaRegMinusSquare size={24} className='w-full'/>
                </button>
            </div>
        </div>
    )
}

export default SetQuantity