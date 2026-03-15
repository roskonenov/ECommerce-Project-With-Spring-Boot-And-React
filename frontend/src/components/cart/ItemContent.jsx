import SetQuantity from './SetQuantity';
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { decreaseCartItemQuantity, increaseCartItemQuantity, removeFromCart } from '../../store/actions';
import { currencyFormatter } from '../../utils/currencyFormatter';
import truncateText from '../../utils/truncateText';


const ItemContent = ({ item }) => {
    const dispatch = useDispatch();

    const handleQtyIncrease = () => {
        dispatch(increaseCartItemQuantity(item));
    }

    const handleQtyDecrease = () => {
        const newQuantity = item.cartQuantity - 1;
        if (newQuantity <= 0) return;
        dispatch(decreaseCartItemQuantity(item, newQuantity))
    }

    const removeItemFromCart = () => {
        dispatch(removeFromCart(item));
    }

    return (
        <div className='grid md:grid-cols-5 grid-cols-4 md:text-[1rem] text-sm gap-4 items-center border border-slate-200 rounded-md lg:px-4 py-4 p-2'>
            <div className='md:col-span-2 justify-self-start flex flex-col gap-2'>

                <div className='flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start'>
                    <h3 className='lg:text-lg text-sm font-semibold text-slate-600'>
                        {truncateText(item.name, 25)}
                    </h3>
                </div>

                <div>
                    <img
                        src={item.image}
                        alt={item.name}
                        className='md:h-36 sm:h-24 h-12 w-full object-cover rounded-md' />
                </div>

                <div>
                    <button
                        onClick={removeItemFromCart}
                        className='flex items-center font-semibold space-x-2 px-3 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-100 transition-colors duration-200 cursor-pointer'
                    >
                        <HiOutlineTrash size={16} className='text-rose-600' />
                        Remove Item
                    </button>
                </div>

            </div>

            <div className='justify-self-center lg:text-lg text-sm text-slate-600 font-semibold'>
                {currencyFormatter(item.specialPrice)}
            </div>

            <div className='justify-self-center'>
                <SetQuantity
                    quantity={item.quantity}
                    cartQuantity={item.cartQuantity}
                    cardCounter={true}
                    handleQtyIncrease={handleQtyIncrease}
                    handleQtyDecrease={handleQtyDecrease}
                />
            </div>

            <div className='justify-self-center lg:text-lg text-sm text-slate-600 font-semibold'>
                {currencyFormatter(item.specialPrice * item.cartQuantity)}
            </div>
        </div>
    )
}

export default ItemContent