import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../shared/InputField';
import { Button } from '@mui/material';
import { registerUserFromAdminDashboard } from '../../../store/actions';

const AddUserForm = ({ setOpen }) => {
    const { btnLoader } = useSelector(state => state.errors);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onTouched' });

    const saveUserFromAdminDashboard = (submitData) => {
        dispatch(registerUserFromAdminDashboard(submitData, reset, setOpen ));
    }
        return (
            <div className='py-5 relative h-full'>
                <form
                    onSubmit={handleSubmit(saveUserFromAdminDashboard)}
                    className='space-y-4'>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <InputField
                            label='Username'
                            id='username'
                            type='text'
                            register={register}
                            errors={errors}
                            required
                            message='* Username is required'
                            placeholder='Choose username'
                            minLength='3'
                            maxLength='255'
                        />
                    </div>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <InputField
                            label='Email'
                            id='email'
                            type='email'
                            register={register}
                            errors={errors}
                            required
                            message='* Email is required!'
                            placeholder='Enter Your Email'
                        />
                    </div>
                    <div className='flex md:flex-row flex-col gap-4 w-full'>
                        <InputField
                            label='Password'
                            id='password'
                            type='password'
                            register={register}
                            errors={errors}
                            required
                            message='* You need Strong Password!'
                            placeholder='Enter Your Password'
                            minLength='6'
                            maxLength='40'
                        />
                    </div>
                    
                    <div className='flex w-full justify-between items-center absolute bottom-20'>
                        <Button
                            disabled={btnLoader}
                            onClick={() => setOpen(false)}
                            variant='outlined'
                            className='text-white py-2.5 px-4 font-medium'>
                            Cancel
                        </Button>
                        <Button
                            loading={btnLoader}
                            disabled={btnLoader}
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='bg-custom-blue text-white py-2.5 px-4 font-medium'
                        >
                            Add User
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

export default AddUserForm;