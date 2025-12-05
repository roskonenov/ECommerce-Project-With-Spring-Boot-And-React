import React, { useEffect, useState } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import AddressInfo from './AddressInfo';
import { useDispatch } from 'react-redux';
import { fetchUserAddresses } from '../../store/actions';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();

    const steps = ['Address', 'Payment Method', 'OrderSummary', 'Payment'];

    useEffect(() => {
        dispatch(fetchUserAddresses());
    }, [dispatch]);

  return (
    <div className='w-[80%] mx-auto py-14 min-h-[calc(100vh-100px)]'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        <div className='mt-16'>
            {activeStep === 0 && <AddressInfo />}
        </div>
    </div>
  )
}

export default Checkout