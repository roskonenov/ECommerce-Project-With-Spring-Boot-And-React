import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';

const Orders = () => {
  const noOrders = false;

  return (
    <div>
      {noOrders ? (
        <div className='flex flex-col justify-center items-center mt-8 mb-20 text-gray-600'>
          <FaShoppingCart size={50} />
          <h1 className='font-semibold text-3xl text-slate-700 py-6'>
            No Orders Placed Yet!
          </h1>
        </div>
      ) : (
        <div>
          <h1 className='font-semibold text-3xl text-slate-700 py-6 text-center'>
            All Orders
          </h1>
          <div>
            <OrderTable />
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders