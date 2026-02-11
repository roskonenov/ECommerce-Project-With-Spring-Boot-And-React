import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';
import useOrdersFilter from '../../../hooks/useOrdersFilter';
import { useSelector } from 'react-redux';
import Spinner from '../../shared/Spinner';

const Orders = () => {
  const { adminOrders, pagination } = useSelector(state => state.orders);
  const { isLoading } = useSelector(state => state.errors);

  useOrdersFilter();
  const noOrders = !adminOrders || adminOrders.length === 0;

  return (
    <div>
      {
        isLoading ? (
          <div className='w-full flex justify-center items-center mt-20'>
          <Spinner  classProps={'w-20'}/>
          </div>
        ) : (
          noOrders ? (
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
                <OrderTable adminOrders={adminOrders} pagination={pagination} />
              </div>
            </div>
          ))}
    </div>
  )
}

export default Orders