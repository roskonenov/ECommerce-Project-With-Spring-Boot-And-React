import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import ProductViewModal from './ProductViewModal';
import truncateText from '../../utils/truncateText';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions';

const ProductCard = ({
  id,
  name,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  index = 0,
}) => {
  const [openProductModal, setOpenProductModal] = useState(false);
  const btnLoader = false;
  const [selectedProduct, setSelectedProduct] = useState('');
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleSelectedProduct = (product) => {
    setOpenProductModal(true);
    setSelectedProduct(product);
  };

  const handleAddProductToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div
      style={{ animationDelay: `${index * 70}ms` }}
      className={'border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 opacity-0 animate-fade-up min-h-[360px]'}>

      <div onClick={() => handleSelectedProduct({
        id,
        name,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
      })}
        className='w-full overflow-hidden aspect-3/2'>
        <img className='w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105 object-cover'
          src={image}
          alt={name} />
      </div>

      <div className='p-4'>

        <h2 onClick={() => handleSelectedProduct({
          id,
          name,
          image,
          description,
          quantity,
          price,
          discount,
          specialPrice,
        })}
          className='text-lg font-semibold mb-2 cursor-pointer'>
          {truncateText(name, 50)}
        </h2>

        <div className='min-h-20 max-h-20'>
          <p className='text-gray-600 text-sm'>{truncateText(description)}</p>
        </div>

        <div className='flex justify-between'>

          <div className='flex flex-col'>
            <span className={`text-gray-400 line-through ${discount ? '' : 'invisible'}`}>
              ${Number(price).toFixed(2)}
            </span>
            <span className='text-lg font-bold text-slate-700'>
              ${Number(specialPrice || price).toFixed(2)}
            </span>
          </div>

          <button
            disabled={!isAvailable || btnLoader}
            onClick={() => handleAddProductToCart({
              id,
              name,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            })}
            className={`bg-blue-500 ${isAvailable ? 'hover:bg-blue-600' : 'opacity-70'} text-white py-2 px-3 rounded-lg flex justify-center items-center transition-colors duration-300 w-36 text-center cursor-pointer`}>
            <FaShoppingCart className='mr-2' />
            {isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </button>

        </div>
      </div>
      <ProductViewModal
        open={openProductModal}
        setOpen={setOpenProductModal}
        product={selectedProduct}
        isAvailable={isAvailable} />
    </div>
  )
}

export default ProductCard