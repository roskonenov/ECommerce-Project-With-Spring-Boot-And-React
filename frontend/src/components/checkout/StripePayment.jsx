import { Alert } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from '../shared/Skeleton';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { createStripeClientSecret } from '../../store/actions';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.errors);
    const { user, clientSecret, selectedCheckoutAddress } = useSelector(state => state.auth);
    const { totalPrice } = useSelector(state => state.carts);

    useEffect(() => {
        if (clientSecret) return;

        const sendData = {
            amount: Number(totalPrice) * 100,
            currency: 'bgn',
            email: user.email,
            name: user.username,
            address: selectedCheckoutAddress,
            description: `Order for ${user.email}`,
        };
        dispatch(createStripeClientSecret(sendData));
        
    }, [clientSecret, dispatch, totalPrice, user, selectedCheckoutAddress]);

    if (isLoading) {
        return (
            <div className='max-w-lg mx-auto'>
                <Skeleton />
            </div>
        )
    }

    return (
        <>
            {clientSecret &&
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm totalPrice={totalPrice} clientSecret={clientSecret} />
                </Elements>
            }
        </>
    )
}

export default StripePayment