import { Alert } from '@mui/material'
import React from 'react'

const StripePayment = () => {
    return (
        <div className='flex justify-center p-6'>
            <Alert variant="filled" severity="warning" style={{ maxWidth: '600px', fontSize: '1rem', fontWeight: 'bold' }}>
                Stripe payment is unavailable! Plese use another payment!
            </Alert>
        </div>
    )
}

export default StripePayment