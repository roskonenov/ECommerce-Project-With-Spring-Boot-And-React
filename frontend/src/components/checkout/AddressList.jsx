import React from 'react';
import { FaBuilding, FaCheckCircle, FaCity, FaEdit, FaStreetView, FaTrash } from "react-icons/fa";
import { MdPinDrop, MdPublic } from "react-icons/md";



const AddressList = ({ addresses, selectedAddress, setSelectedAddress, setOpenAddAddressModal, setOpenDeleteAddressModal }) => {

    const addressSelectionHandler = (address) => {
        setSelectedAddress(address);
    };

    const editAddressHandler = () => {
        setOpenAddAddressModal(true);
    };

    const deleteAddressHandler = () => {
        setOpenDeleteAddressModal(true);
    };

    return (
        <div className='space-y-4'>
            {addresses
            .map(address => (
                <div
                    key={address.id}
                    onClick={() => addressSelectionHandler(address)}
                    className={`p-4 border rounded-md cursor-pointer relative ${selectedAddress.id === address.id
                            ? 'bg-green-100'
                            : 'bg-white'
                        }`}>
                    <div className='flex items-start'>
                        <div className='space-y-1'>

                            <div className='flex items-center'>
                                <FaCity size={14} className='mr-2 text-gray-600' />
                                <p className='font-semibold'>{address.city}</p>
                                {selectedAddress.id === address.id &&
                                    <FaCheckCircle className='text-green-400 ml-3' />}
                            </div>

                            <div className='flex items-center'>
                                <FaStreetView size={14} className='mr-2 text-gray-600' />
                                <p>{address.street}</p>
                            </div>

                            <div className='flex items-center'>
                                <FaBuilding size={14} className='mr-2 text-gray-600' />
                                <p className='mr-3'>{address.building}</p>
                                <p>{address.apartment}</p>
                            </div>

                            <div className='flex items-center'>
                                <MdPublic size={14} className='mr-2 text-gray-600' />
                                <p className='mr-3'>{address.country}</p>
                                <p>{address.state}</p>
                            </div>

                            <div className='flex items-center'>
                                <MdPinDrop size={14} className='mr-2 text-gray-600' />
                                <p>{address.postalCode}</p>
                            </div>

                        </div>
                    </div>
                    <div className='flex gap-3 absolute top-3 right-3'>
                        <button
                            className='cursor-pointer hover:scale-115 transition'
                            onClick={editAddressHandler}>
                            <FaEdit size={18} className='text-teal-700' />
                        </button>
                        <button
                            className='cursor-pointer hover:scale-115 transition'
                            onClick={deleteAddressHandler}>
                            <FaTrash size={16} className='text-rose-600' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AddressList