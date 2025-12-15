import React, { useEffect, useState } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinner from '../shared/Spinner';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { selectedCheckoutAddress } = useSelector(state => state.auth);
    const { isLoading, errorMessage } = useSelector(state => state.errors);
    const { paymentMethod } = useSelector(state => state.payment);

    const steps = ['Address', 'Payment Method', 'OrderSummary', 'Payment'];

    useEffect(() => {
        dispatch(fetchUserAddresses());
    }, [dispatch]);

    const handleBack = () => {
        if (activeStep === 0) return;

        setActiveStep(prev => prev - 1);
    };

    const handleNext = () => {
        if (activeStep === 0 && !selectedCheckoutAddress) {
            toast.error('Please select checkout address before proceeding')
            return;
        }

        if (activeStep === 1 && (!selectedCheckoutAddress || !paymentMethod)) {
            toast.error('Please select payment before proceeding')
            return;
        }
        setActiveStep(prev => prev + 1);
    };

    return (
        <div className='w-[80%] mx-auto py-14 min-h-[calc(100vh-100px)]'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {isLoading ? (
                <div className='w-full flex justify-center mt-30'>
                    <Spinner classProps={'w-20'}/>
                </div>
            ) : (
                <div className='mt-10 mb-20'>
                    {activeStep === 0 && <AddressInfo />}
                    {activeStep === 1 && <PaymentMethod />}
                    {activeStep === 2 && <OrderSummary />}
                </div>
            )}


            <div className='fixed bottom-0 left-0 w-full z-50 h-20 shadow-md flex justify-between items-center bg-white border-gray-400'
                style={{ boxShadow: '0 -2px 4px rgba(100, 100, 100, 0.15)' }}>

                <button
                    disabled={activeStep === 0}
                    className='border px-3 py-1.5 text-white bg-gray-700 ml-4 rounded-md w-22 font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                    onClick={handleBack}
                >
                    Back
                </button>

                {activeStep !== steps.length - 1 &&
                    <button
                        className='border px-3 py-1.5 text-white bg-custom-blue mr-4 rounded-md w-22 font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                        onClick={handleNext}
                        disabled={errorMessage ||
                            (activeStep === 0
                                ? !selectedCheckoutAddress
                                : activeStep === 1
                                    ? !paymentMethod
                                    : false)}
                    >
                        Proceed
                    </button>}

            </div>
            {errorMessage && <ErrorPage message={errorMessage}/>}
        </div>
    )
}

export default Checkout