import Button from '@mui/material/Button';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCloudUploadAlt } from 'react-icons/fa'

const ImageUploadForm = ({ setOpen, product }) => {
    const MAX_FILE_SIZE = 32 * 1024 * 1024 // 32 MB
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;

        } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
            toast.error('Please select a valid image file (.jpeg, .jpg, .png)');
            return;

        } else if (file.size > MAX_FILE_SIZE) {
            toast.error('File is too large — maximum 32 MB!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
        setSelectedFile(file);
    }

    const handleImageRemove = () => {
        fileInputRef.current.value = null;
        setImagePreview(null);
        setSelectedFile(null);
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className='relative h-full py-4'>
            <form onSubmit={handleImageUpload}>
                <div className='flex flex-col gap-4 w-full'>

                    <label
                        className='mx-auto my-4 w-4/5 flex flex-wrap justify-center items-center gap-2 font-semibold text-gray-600 border-2 border-dashed border-custom-blue p-2 rounded-md cursor-pointer'
                    >
                        <FaCloudUploadAlt size={26} />
                        <span>Upload Image</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className='hidden'
                            accept='image/jpeg, image/jpg, image/png'
                        />
                        <span
                            className='w-full text-center text-xs'
                        >Up to 32 MB</span>
                    </label>

                    {imagePreview && (
                        <div className='text-center'>
                            <img src={imagePreview}
                                alt="Preview of the Image to Upload"
                                className='h-80 rounded-md mx-auto my-4' />
                            <button
                                type='button'
                                className='bg-rose-600 text-white font-semibold rounded-md px-4 py-2 mt-4 hover:bg-rose-700 hover:text-gray-300 transition-colors duration-200 cursor-pointer'
                                onClick={handleImageRemove}
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
                </div>

                <div className='flex w-full justify-between items-center absolute bottom-20'>
                    <Button
                        disabled={loader}
                        onClick={() => setOpen(false)}
                        variant='outlined'
                        className='text-white py-2.5 px-4 font-medium'>
                        Cancel
                    </Button>
                    <Button
                        loading={loader}
                        disabled={loader}
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

export default ImageUploadForm