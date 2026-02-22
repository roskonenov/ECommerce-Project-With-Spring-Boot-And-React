import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Skeleton from '../../shared/Skeleton';
import ErrorPage from '../../shared/ErrorPage';
import { createCategory, updateCategory } from '../../../store/actions';

const AddUpdateCategoryForm = ({ setOpen, category, update = false, modalMode }) => {
    const { btnLoader, categoryLoader, categoryError, errorMessage } = useSelector(state => state.errors);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ mode: 'onTouched' });


    useEffect(() => {
        if (!category || !update) return;

        setValue('name', category?.name);

    }, [update, category, setValue]);

    const saveCategory = (submitData) => {
        if (update) {
            const sendData = {
                ...submitData,
                id: category.id
            };
            dispatch(updateCategory(sendData, reset, setOpen));

        } else {

            dispatch(createCategory(submitData, reset, setOpen));
        }
    }

    if (categoryLoader) return <Skeleton />;
    if (categoryError) return <ErrorPage message={errorMessage} />

    return (
        <div className='py-5 relative h-full'>
            <form
                onSubmit={handleSubmit(saveCategory)}
                className='space-y-4'>
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
                        {modalMode === 'edit' ? 'Update' : 'Add'}
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default AddUpdateCategoryForm