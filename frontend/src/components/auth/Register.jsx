import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import InputField from '../shared/InputField';
import toast from 'react-hot-toast';
import { registerUser } from '../../store/actions';
import Spinner from '../shared/Spinner';


const Register = () => {
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onTouched' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerSubmit = (data) => {
        dispatch(registerUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form onSubmit={handleSubmit(registerSubmit)}
                className='sm:w-md w-90 shadow-custom px-4 sm:px-8 py-8 rounded-md'>

                <div className='flex flex-col justify-center items-center space-y-4'>
                    <FaUserPlus className='text-5xl text-slate-800' />
                    <h1 className='text-center text-2xl lg:text-3xl text-slate-800 font-montserrat font-bold'>
                        Register
                    </h1>
                </div>

                <hr className='text-black mt-3 mb-6' />

                <div className='flex flex-col space-y-4'>

                    <InputField
                        label='Username'
                        id='username'
                        required
                        min={3}
                        message='* Username is required'
                        type='text'
                        placeholder='Enter your username'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='Email'
                        id='email'
                        required
                        message='* Email is required'
                        type='email'
                        placeholder='Enter your email'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='Password'
                        id='password'
                        min={6}
                        required
                        message='* Password is required'
                        type='password'
                        placeholder='Enter your password'
                        register={register}
                        errors={errors} />

                </div>

                <button className={`bg-button-gradient flex gap-4 items-center justify-center rounded-md text-white font-semibold w-full my-4 hover:text-slate-400 transition-colors duration-100 py-2 ${loader ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={loader}>
                    {loader ?
                        <>
                            <Spinner classProps={'w-6'} />
                            Loading...
                        </>
                        :
                        <>Register</>}
                </button>

                <p className='text-slate-600 text-sm flex gap-2 justify-center items-center mt-5'>
                    Already have an account?
                    <Link className='font-semibold underline hover:text-slate-900 transition'
                        to='/register'>
                        <span>
                            Login Here
                        </span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default Register