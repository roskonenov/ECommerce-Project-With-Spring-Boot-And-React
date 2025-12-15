import React from 'react'
import { useSelector } from 'react-redux'

const OrderSummary = () => {
    const { selectedCheckoutAddress: address } = useSelector(state => state.auth);
    const { paymentMethod } = useSelector(state => state.payment);
    const { cart } = useSelector(state => state.carts);
    return (
        <div className='container mx-auto px-4'>
            <div className='flex flex-wrap'>
                <div className='w-full lg:w-8/12 pr-4'>
                    <div className='space-y-4'>
                        <div className='p-4 border rounded-lg shadow-sm'>
                            <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
                            <p>
                                <strong>Postal Code: </strong>
                                {address?.postalCode}
                            </p>
                            {address?.apartment &&
                                <p>
                                    <strong>Apartment: </strong>
                                    {address?.apartment}
                                </p>}
                            <p>
                                <strong>Building: </strong>
                                {address?.building}
                            </p>
                            <p>
                                <strong>Street: </strong>
                                {address?.street}
                            </p>
                            <p>
                                <strong>City: </strong>
                                {address?.city}
                            </p>
                            <p>
                                <strong>State: </strong>
                                {address?.state}
                            </p>
                            <p>
                                <strong>Country: </strong>
                                {address?.country}
                            </p>
                        </div>
                        <div className='p-4 border rounded-lg shadow-sm'>
                            <h2 className='text-2xl font-semibold mb-2'>
                                Payment
                            </h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </div>
                        <div className='p-4 border rounded-lg shadow-sm mb-6'>
                            <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
                            <div className='space-y-2'>
                                {cart?.map(item => (
                                    <div key={item?.id} className='flex items-center'>
                                        <img src={item?.image} alt={item?.name}
                                            className='w-12 h-12 rounded' />
                                        <div className='text-gray-500'>
                                            <p>{item.name}</p>
                                            <p>
                                                {item?.quantity} x ${item?.specialPrice} = ${item.quantity * item.specialPrice}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary