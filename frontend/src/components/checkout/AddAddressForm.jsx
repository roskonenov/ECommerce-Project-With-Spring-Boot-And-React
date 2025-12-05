import React from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../shared/InputField';
import { FaRegAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../shared/Spinner';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';

const AddAddressForm = ({ address, setOpenModal }) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector(state => state.errors);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });

    const onAddressSaveHandler = (data) => {
        console.log(data, address, setOpenModal);
        
        dispatch(addUpdateUserAddress(data, toast, address?.id, setOpenModal));
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onAddressSaveHandler)}
                className='sm:w-md w-90 shadow-custom px-4 sm:px-8 py-8 rounded-md'>

                <div className='flex justify-center items-center gap-3 space-y-4 text-slate-800 font-semibold text-2xl px-2 py-4 mb-3'>
                    <FaRegAddressCard className='text-5xl text-slate-800' />
                    Add Address
                </div>

                <div className='flex flex-col space-y-4'>

                    <InputField
                        label='Country'
                        id='country'
                        required
                        message='* Country is required'
                        type='text'
                        placeholder='Enter your country'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='City'
                        id='city'
                        required
                        message='* City is required'
                        type='text'
                        placeholder='Enter your city'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='State'
                        id='state'
                        required
                        message='* State is required'
                        type='text'
                        placeholder='Enter your state'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='Street'
                        id='street'
                        required
                        message='* Street is required'
                        type='text'
                        placeholder='Enter your street'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='Building'
                        id='building'
                        required
                        message='* Building is required'
                        type='text'
                        placeholder='Enter your building'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='Apartment'
                        id='apartment'
                        message='* Apartment is required'
                        type='text'
                        placeholder='Enter your apartment'
                        register={register}
                        errors={errors} />

                    <InputField
                        label='Postal Code'
                        id='postalCode'
                        required
                        message='* Postal Code is required'
                        type='text'
                        placeholder='Enter your Postal Code'
                        register={register}
                        errors={errors} />

                </div>

                <button
                    type='submit'
                    className={`flex gap-2 text-white bg-custom-blue rounded-md px-4 py-2 mt-4 ${btnLoader ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={btnLoader}>
                    {btnLoader ?
                        <>
                            <Spinner classProps={'w-6'} />
                            Loading...
                        </>
                        :
                        <>
                            Save
                        </>}
                </button>
            </form>
        </div>
    )
}

export default AddAddressForm