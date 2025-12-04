import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React from 'react'
import { FaTimes } from 'react-icons/fa';

const AddAddressModal = ({ open, setOpen, children }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-gray-700/50" />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="sm:w-md w-90 max-w-md mx-auto relative bg-white rounded-lg shadow-xl transform overflow-hidden transition-all">
                    <div>
                        {children}
                    </div>
                    <div className="flex justify-end gap-4 absolute top-2 right-4">
                        <button onClick={() => setOpen(false)} type='button'>
                            <FaTimes className='text-slate-700 cursor-pointer' size={25} />
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default AddAddressModal;