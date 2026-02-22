import React, { useState } from 'react'
import useCategoryFilter from '../../../hooks/useCategoryFilter';
import { useSelector } from 'react-redux';
import { FaFolderOpen, FaThList } from 'react-icons/fa';
import CategoryTable from './CategoryTable';
import Spinner from '../../shared/Spinner';

const Categories = () => {
  const { categoryLoader } = useSelector(state => state.errors);
  const { categories, categoryPagination } = useSelector(state => state.products);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [modalMode, setModalMode] = useState('');

  useCategoryFilter();

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setModalMode('add');
  }

  const noCategories = !categories || categories.length === 0;

  return (
    <div>
      <div className='py-8 flex justify-end'>
        <button
          onClick={handleOpenAddModal}
          className='bg-custom-blue text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-800 hover:text-slate-400 transition-colors duration-300 cursor-pointer flex items-center gap-2'>
          <FaThList className='text-xl' />
          Add Category
        </button>
      </div>
      {
        categoryLoader ? (
          <div className='w-full flex justify-center items-center mt-20'>
            <Spinner classProps={'w-20'} />
          </div>
        ) : (
          noCategories ? (
            <div className='flex flex-col justify-center items-center mt-12 mb-20 text-gray-600'>
              <FaFolderOpen size={50} />
              <h1 className='font-semibold text-3xl text-slate-700 py-6'>
                There are no Categories Yet!
              </h1>
            </div>
          ) : (
            <div>
              <h1 className='font-semibold text-3xl text-slate-700 py-6 text-center'>
                All Categories
              </h1>
              <div>
                <CategoryTable
                  categories={categories}
                  pagination={categoryPagination}
                  openAddModal={openAddModal}
                  setOpenAddModal={setOpenAddModal}
                  modalMode={modalMode}
                  setModalMode={setModalMode}
                />
              </div>
            </div>
          ))}
    </div>
  )
}

export default Categories