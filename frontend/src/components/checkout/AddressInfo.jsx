import React, { useState } from 'react'
import AddressSceleton from './AddressSceleton';
import { FaRegAddressBook } from 'react-icons/fa';

const AddressInfo = () => {
    const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const noAddressExist = true;
    const isLoading = true;

    const addNewAddressHandler = () => {
        setSelectedAddress('');
        setOpenAddAddressModal(true);
    };
    return (
        <div className='pt-4'>
            {noAddressExist ? (
                <div className='flex flex-col space-y-4 items-center justify-center'>
                    <FaRegAddressBook size={50} className='text-slate-800' />
                    <h1 className='text-2xl text-slate-800 font-bold text-center my-4'>
                        No Address Added Yet
                    </h1>
                    <p className='text-lg text-center text-slate-700 font-semibold'>
                        Please provide an address to complete the purchase
                    </p>
                </div>
            ) : (
                <div className='rounded-lg max-w-md p-6 mx-auto'>
                    <h1 className=' text-slate-800 text-center text-3xl font-bold'>
                        Select Address
                    </h1>
                    {isLoading ? (
                        <div className='py-6 px-8 mt-6'>
                            <AddressSceleton />
                        </div>

                    ) : (
                        <div>
                            <p>addresses here...</p>
                        </div>
                    )}
                </div>
            )}
            <button
                onClick={addNewAddressHandler}
                className='bg-blue-500 py-3 px-6 rounded text-white font-semibold mx-auto block mt-4 cursor-pointer hover:bg-custom-blue transition-colors'>
                Add Address
            </button>
        </div>
    )
}

export default AddressInfo