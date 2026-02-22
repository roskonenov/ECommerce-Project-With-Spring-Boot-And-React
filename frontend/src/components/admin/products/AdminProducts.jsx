import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../../shared/Spinner';
import { FaBoxOpen } from 'react-icons/fa';
import { MdAddShoppingCart } from "react-icons/md";
import ProductsTable from './ProductsTable';
import { useAdminDashboardProductFilter } from '../../../hooks/useProductsFilter';

const AdminProducts = () => {
  const { isLoading } = useSelector(state => state.errors);
  const { products, pagination } = useSelector(state => state.products);
  const [openAddModal, setOpenAddModal] = useState(false);
    const [modalMode, setModalMode] = useState('');

  useAdminDashboardProductFilter();

  const noProducts = !products || products.length === 0;
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setModalMode('add');
    console.log('Modal mode changed to add');
    
  }

  return (
    <div>
      <div className='py-8 flex justify-end'>
        <button
          onClick={handleOpenAddModal}
          className='bg-custom-blue text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-800 hover:text-slate-400 transition-colors duration-300 cursor-pointer flex items-center gap-2'>
          <MdAddShoppingCart className='text-xl' />
          Add Product
        </button>
      </div>
      {
        isLoading ? (
          <div className='w-full flex justify-center items-center mt-20'>
            <Spinner classProps={'w-20'} />
          </div>
        ) : (
          noProducts ? (
            <div className='flex flex-col justify-center items-center mt-12 mb-20 text-gray-600'>
              <FaBoxOpen size={50} />
              <h1 className='font-semibold text-3xl text-slate-700 py-6'>
                There are no Products Yet!
              </h1>
            </div>
          ) : (
            <div>
              <h1 className='font-semibold text-3xl text-slate-700 py-6 text-center'>
                All Products
              </h1>
              <div>
                <ProductsTable 
                products={products} 
                pagination={pagination} 
                openAddModal={openAddModal} 
                setOpenAddModal={setOpenAddModal}
                modalMode={modalMode}
                setModalMode={setModalMode} />
              </div>
            </div>
          ))}
    </div>
  )
}

export default AdminProducts