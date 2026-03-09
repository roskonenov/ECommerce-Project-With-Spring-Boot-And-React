import React, { useState } from 'react'
import useUsersFilter from '../../../hooks/useUsersFilter';
import { useSelector } from 'react-redux';
import { FaUserAltSlash, FaUserPlus } from 'react-icons/fa';
import UserTable from './UserTable';
import Spinner from '../../shared/Spinner';
import AddUserForm from './AddUserForm';
import Modal from '../../shared/Modal';

const User = () => {
  const { users, pagination } = useSelector(state => state.admin);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { isLoading } = useSelector(state => state.errors);

  useUsersFilter();
  const noUsers = !users || users.length === 0;

  return (
    <div>

      <div className='py-8 flex justify-end'>
        <button
          onClick={() => setOpenAddModal(true)}
          className='bg-custom-blue text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-800 hover:text-slate-400 transition-colors duration-300 cursor-pointer flex items-center gap-2'>
          <FaUserPlus className='text-xl' />
          Add User
        </button>
      </div>

      {
        isLoading ? (
          <div className='w-full flex justify-center items-center mt-20'>
            <Spinner classProps={'w-20'} />
          </div>
        ) : (
          noUsers ? (
            <div className='flex flex-col justify-center items-center mt-8 mb-20 text-gray-600'>
              <FaUserAltSlash size={50} />
              <h1 className='font-semibold text-3xl text-slate-700 py-6'>
                No Users Registered Yet!
              </h1>
            </div>
          ) : (
            <div>
              <h1 className='font-semibold text-3xl text-slate-700 py-6 text-center'>
                All Users
              </h1>
              <div>
                <UserTable adminUsers={users} pagination={pagination} />
              </div>
            </div>
          ))}

      <Modal
        open={openAddModal}
        setOpen={setOpenAddModal}
        title='Add New User'>
        <AddUserForm
          setOpen={setOpenAddModal}
        />
      </Modal>

    </div>
  )
}

export default User;