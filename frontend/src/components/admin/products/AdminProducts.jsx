import React from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../../shared/Spinner';
import { FaBoxOpen } from 'react-icons/fa';
import ProductsTable from './ProductsTable';

const AdminProducts = () => {
  const { isLoading } = useSelector(state => state.errors);

  const products = [ { "id": 1, "name": "TV set TCL", "image": "https://i.ibb.co/SXWVWrXq/TV-set-TCL.jpg", "description": "60 inches", "quantity": 19, "price": 5500.0, "discount": 0.0, "specialPrice": 5500.0 }, { "id": 2, "name": "OLED TV set TCL", "image": "https://i.ibb.co/mrD8FKvR/OLED-TV-set-TCL.jpg", "description": "55 inches", "quantity": 27, "price": 4999.0, "discount": 5.0, "specialPrice": 4749.05 }];

  const pagination = {"pageNumber": 0, "pageSize": 12, "totalElements": 34, "totalPages": 3, "lastPage": false};

  const noProducts = !products || products.length === 0;
  
  return (
    <div>
      {
        isLoading ? (
          <div className='w-full flex justify-center items-center mt-20'>
          <Spinner  classProps={'w-20'}/>
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
                <ProductsTable products={products} pagination={pagination} />
              </div>
            </div>
          ))}
    </div>
  )
}

export default AdminProducts