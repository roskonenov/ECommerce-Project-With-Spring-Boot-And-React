import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import Skeleton from '../shared/Skeleton';

const PaymentForm = ({totalPrice, clientSecret}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const isLoading = !clientSecret || !stripe || !elements;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const {error: submitError} = await elements.submit();
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
            },
        });
        if (error) {
            setErrorMessage(error.message);
            return false;
        }
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-lg mx-auto p-4'>
            <h2 className='text-xl font-semibold mb-6'>Payment Information</h2>
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    {clientSecret && <PaymentElement options={{ layout: 'tabs' }} />}
                    {errorMessage && <div className='text-red-500'>{errorMessage}</div>}
                    <button
                        disabled={isLoading}
                        className='w-full text-white bg-black rounded-md mt-3 px-2 py-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-pulse'>
                        {`Pay $${totalPrice}`}
                    </button>
                </>
            )}
        </form>
    )
}

export default PaymentForm