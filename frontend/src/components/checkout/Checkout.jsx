import React, { useState } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Address', 'Payment Method', 'OrderSummary', 'Payment'];

  return (
    <div className='w-[80%] mx-auto py-14 min-h-[calc(100vh-100px)]'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel sx={{color: 'blue', fontWeight: 'bold'}}>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
  )
}

export default Checkout