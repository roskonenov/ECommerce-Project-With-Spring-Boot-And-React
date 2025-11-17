import React, { useEffect, useState } from 'react'
import HeroBaner from './HeroBaner'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/actions';
import Spinner from '../shared/Spinner';
import { FaExclamationTriangle } from 'react-icons/fa';
import ProductCard from '../shared/ProductCard';

const Home = () => {
  const { isLoading, errorMessage } = useSelector(state => state.errors);
  const { products } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState(1); // Category IDs on backend (development) starts from 1

  useEffect(() => {
    dispatch(fetchProducts(selectedCategoryId)); 
  }, [dispatch, selectedCategoryId]);

  return (
    <div className='px-4 sm:px-8 lg:px-16'>
      <div className='py-6'>
        <HeroBaner onCategoryChange={setSelectedCategoryId} />
      </div>
      <div className='text-center'>
        <h1 className='font-extrabold text-5xl text-slate-800 pt-4'>
          Our Top Offers
        </h1>
      </div>
      {isLoading ? (
        <div className='min-h-[700px]'>
          <Spinner />
        </div>
      ) : errorMessage ? (
        <div className='flex justify-center items-center h-[200px]'>
          <FaExclamationTriangle className='text-slate-800 text-3xl mr-2' />
          <span className='text-lg font-medium text-slate-800'>
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className='min-h-[700px]'>
          <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
            {products &&
              products
                .filter(product => product.discount > 0)
                .sort((a, b) => b.discount - a.discount)
                .slice(0, 4)
                .map((item, i) => <ProductCard key={i} index={i} {...item} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home