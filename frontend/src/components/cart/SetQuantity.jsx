import React from 'react'
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";

const SetQuantity = ({
    quantity,
    cardCounter,
    handleQtyIncrease,
    handleQtyDecrease
}) => {
    return (
        <div className='flex gap-8 items-center'>
            {cardCounter ? null : <div className='font-semibold'>QUANTITY</div>}
            <div className='flex md:flex-row flex-col gap-4 items-center lg:text-xl text-sm'>
                <button
                    className='text-slate-800 cursor-pointer'
                    onClick={handleQtyIncrease}
                >
                    <FaRegPlusSquare size={24} className='w-full' />
                </button>

                <div className='text-red-500 font-semibold'>{quantity}</div>

                <button
                    disabled={quantity <= 1}
                    className='text-slate-800 cursor-pointer'
                    onClick={handleQtyDecrease}
                >
                    <FaRegMinusSquare size={24} className='w-full' />
                </button>
            </div>
        </div>
    )
}

export default SetQuantity