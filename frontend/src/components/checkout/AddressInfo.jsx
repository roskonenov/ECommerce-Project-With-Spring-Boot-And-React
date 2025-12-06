import React, { useEffect, useState } from 'react'
import AddressSceleton from './AddressSceleton';
import { FaRegAddressBook } from 'react-icons/fa';
import AddAddressModal from './AddAddressModal';
import AddAddressForm from './AddAddressForm';
import AddressList from './AddressList';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckoutAddress } from '../../store/actions';

const AddressInfo = () => {
    const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const { isLoading, btnLoader } = useSelector(state => state.errors);
    const { address } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const noAddressExist = !address || address.length === 0 || address?.success === false;

    const addNewAddressHandler = () => {
        setSelectedAddress('');
        setOpenAddAddressModal(true);
    };

    useEffect(() => {
        dispatch(setCheckoutAddress(selectedAddress));
    }, [dispatch, selectedAddress]);

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
                    <h1 className=' text-slate-800 text-center text-3xl font-bold mb-3'>
                        Select Address
                    </h1>
                    {isLoading ? (
                        <div className='py-6 px-8 mt-6'>
                            <AddressSceleton />
                        </div>
                    ) : (
                        <AddressList
                            addresses={address}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            setOpenAddAddressModal={setOpenAddAddressModal}
                        />
                    )}
                </div>
            )}
            <button
                onClick={addNewAddressHandler}
                className='bg-blue-500 py-3 px-6 rounded text-white font-semibold mx-auto block mt-4 cursor-pointer hover:bg-custom-blue transition-colors'>
                Add Address
            </button>

            <AddAddressModal
                open={openAddAddressModal}
                setOpen={setOpenAddAddressModal}>
                <AddAddressForm
                    address={selectedAddress}
                    setOpenModal={setOpenAddAddressModal} />
            </AddAddressModal>
        </div>
    )
}

export default AddressInfo