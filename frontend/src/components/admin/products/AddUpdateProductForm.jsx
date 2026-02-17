import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const AddUpdateProductForm = ({ setOpen, product, update = false }) => {
    const { errorMessage, btnLoader } = useSelector(state => state.errors);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ mode: 'onTouched' });

    useEffect(() => {
        if (!product || !update) return;
console.log(product, update);

        setValue('name', product?.name);
        setValue('description', product?.description);
        setValue('quantity', product?.quantity);
        setValue('price', product?.price);
        setValue('discount', product?.discount);
        setValue('specialPrice', product?.specialPrice);

    }, [update, product, setValue]);
    return (
        <div className='py-5 relative h-full'>
            <form className='space-y-4'>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        label='Name'
                        id='name'
                        type='text'
                        register={register}
                        errors={errors}
                        required
                        message='* Name is required'
                        placeholder='Add product name'
                        minLength='3'
                        maxLength='255'
                    />
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        label='Quantity'
                        id='quantity'
                        type='number'
                        register={register}
                        errors={errors}
                        required
                        message='* Quantity is required'
                        placeholder='Add quantity in stock'
                        min='0'
                    />
                    <InputField
                        label='Price'
                        id='price'
                        type='number'
                        register={register}
                        errors={errors}
                        required
                        message='* Price is require'
                        placeholder='Add product price'
                        min='0'
                        step='0.01'
                    />
                </div>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        label='Discount'
                        id='discount'
                        type='number'
                        register={register}
                        errors={errors}
                        placeholder='Add product discount'
                        min='0'
                        max='100'
                    />
                    <InputField
                        label='Special Price'
                        id='specialPrice'
                        type='number'
                        register={register}
                        errors={errors}
                        placeholder='Add product special price'
                        min='0'
                        step='0.01'
                    />
                </div>
                <div className='flex flex-col gap-4 w-full'>
                    <label htmlFor='description'
                        className='font-semibold text-sm text-slate-800'
                    >
                        Description
                    </label>

                    <textarea
                        id='description'
                        rows={5}
                        placeholder='Add product description'
                        minLength='6'
                        maxLength='1000'
                        className={` p-2 border outline-none bg-transparent text-slate-800 rounded-md
                ${errors.description?.message ? 'border-red-500' : 'border-slate-700'}`}
                        {...register('description', {
                            required: { value: true, message: '* Description is required!' },
                            minLength: { value: 6, message: '* Minimum 6 characters is required!' },
                            maxLength: { value: 1000, message: '* Maximum of 1000 characters length exceeded!' }
                        })}
                    />

                    {errors.description?.message && (
                        <p className='text-sm font-semibold text-red-600 mt-0'>
                            {errors.description?.message}
                        </p>
                    )}
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
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddUpdateProductForm