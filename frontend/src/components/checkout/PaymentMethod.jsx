import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUsersCart, setPaymentMethod } from '../../store/actions';

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector(state => state.payment);
    const { cart, cartId } = useSelector(state => state.carts);
    const { isLoading, errorMessage } = useSelector(state => state.errors);
    
    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            
            const sentCartItems = cart.map(item => {
                return {
                    productId: item.id,
                    quantity: item.cartQuantity
                };
            });
            dispatch(createUsersCart(sentCartItems));
        }
    }, [dispatch, cart, cartId, errorMessage]);

    const changePaymentMethodHandler = (method) => {
        dispatch(setPaymentMethod(method));
    };

    return (
        <div className='max-w-md mx-auto border shadow-md rounded-xl p-6'>
            <h1 className='text-gray-700 text-2xl text-center mb-3 font-semibold'>
                Select Payment Method
            </h1>
            <FormControl>
                <RadioGroup
                    aria-label="payment method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => changePaymentMethodHandler(e.target.value)}
                    className='text-gray-600'
                >
                    <FormControlLabel
                        value="Stripe"
                        control={<Radio />}
                        label="Stripe" />

                    <FormControlLabel
                        value="PayPal"
                        control={<Radio />}
                        label="PayPal" />

                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default PaymentMethod