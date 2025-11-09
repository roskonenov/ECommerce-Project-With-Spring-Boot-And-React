import React, { useEffect } from 'react'
import ProductCard from './ProductCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions';

const Products = () => {

    const isLoading = false;
    const errorMesage = '';
    const { products } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    console.log(products);
    
    return (
        <div className='lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto'>
            {isLoading ? (
                <p>It is Loading...</p>
            ) : errorMesage ? (
                <div className='flex justify-center items-center h-[200px]'>
                    <FaExclamationTriangle className='text-slate-800 text-3xl mr-2' />
                    <span className='text-lg font-medium text-slate-800'>
                        {errorMesage}
                    </span>
                </div>
            ) : (
                <div className='min-h-[700px]'>
                    <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                        {products &&
                            products.map((item, i) => <ProductCard key={i} {...item} />)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products