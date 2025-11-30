import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLogin } from "react-icons/ai";
import InputField from '../shared/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateUserLogin } from '../../store/actions';
import toast from 'react-hot-toast';


const LogIn = () => {
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onTouched' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginSubmit = (data) => {
        dispatch(authenticateUserLogin(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form onSubmit={handleSubmit(loginSubmit)}
                className='sm:w-md w-90 shadow-custom px-4 sm:px-8 py-8 rounded-md'>

                <div className='flex flex-col justify-center items-center space-y-4'>
                    <AiOutlineLogin className='text-5xl text-slate-800' />
                    <h1 className='text-center text-2xl lg:text-3xl text-slate-800 font-montserrat font-bold'>
                        Login
                    </h1>
                </div>

                <hr className='text-black mt-3 mb-6' />

                <div className='flex flex-col space-y-4'>

                    <InputField
                        label='Username'
                        id='username'
                        required
                        message='* Username is required'
                        type='text'
                        placeholder='Enter your username'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='Password'
                        id='password'
                        required
                        message='* Password is required'
                        type='password'
                        placeholder='Enter your password'
                        register={register}
                        errors={errors} />

                </div>

                <button className={`bg-button-gradient flex gap-2 items-center justify-center rounded-md text-white font-semibold w-full my-4 hover:text-slate-400 transition-colors duration-100 py-2 ${loader ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={loader}>
                    {loader ? <>Loading...</> : <>Login</>}
                </button>

                <p className='text-slate-600 text-sm flex gap-2 justify-center items-center mt-5'>
                    Don't have an account?
                    <Link className='font-semibold underline hover:text-slate-900 transition'
                        to='/register'>
                        <span>
                            SignUp Here
                        </span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default LogIn