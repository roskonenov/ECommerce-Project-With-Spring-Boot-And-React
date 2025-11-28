import React from 'react'
import { MdArrowBack, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ItemContent from './ItemContent'
import EmptyCart from './EmptyCart'

const Cart = () => {
    const { cart } = useSelector(state => state.carts);
    const cartCopy = { ...cart };

    cartCopy.totalPrice = cart.reduce((acc, current) => {
        return acc + Number(current?.specialPrice) * Number(current?.quantity);
    }, 0);

    if (!cart || cart.length < 1) return <EmptyCart />;

    return (
        <div className='px-4 sm:px-8 lg:px-16 py-10'>
            <header className='flex flex-col items-center mb-12 gap-4'>
                <h1 className='text-4xl font-bold text-gray-800 flex items-center gap-4'>
                    <MdShoppingCart size={36} className='text-gray-700' />
                    Your Cart
                </h1>
                <p className='text-lg font-semibold text-gray-600'>
                    All your selected items
                </p>
            </header>

            <div className='grid grid-cols-4 md:grid-cols-5 gap-4 pb-2 font-semibold items-center'>

                <div className='md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4'>
                    Product
                </div>

                <div className='justify-self-center text-lg text-slate-800'>
                    Price
                </div>

                <div className='justify-self-center text-lg text-slate-800'>
                    Quantity
                </div>

                <div className='justify-self-center text-lg text-slate-800'>
                    Total
                </div>

            </div>

            <div>
                {cart?.length > 0 && cart.map((product, i) => <ItemContent key={i} item={product} />)}
            </div>

            <div className='border-t-2 border-slate-300 py-4 flex sm:flex-row flex-col sm:px-0 px-2 sm:justify-between gap-4'>

                <div></div>
                <div className='flex text-sm gap-1 flex-col'>
                    <div className='flex justify-between w-full md:text-lg text-sm font-semibold'>
                        <span>Subtotal</span>
                        <span>$500</span>
                    </div>
                    <p className='text-slate-500'>
                        Taxes and shipping calculated at checkout
                    </p>

                    <Link className='w-full flex justify-end' to='/checkout'>
                        <button className='font-semibold w-75 py-2 px-4 rounded-sm bg-custom-blue text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500 cursor-pointer'>
                            <MdShoppingCartCheckout size={20} />
                            Checkout
                        </button>
                    </Link>

                    <Link className='flex gap-2 items-center mt-2 text-slate-500' to='/products' >
                        <MdArrowBack size={15} />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Cart