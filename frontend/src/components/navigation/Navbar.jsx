import { Badge } from '@mui/material';
import React, { useState } from 'react'
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { GiShop } from "react-icons/gi"; import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { cart } = useSelector(state => state.carts);
  const { user } = useSelector(state => state.auth);

  const path = useLocation().pathname;
  return (
    <div className='h-16 bg-custom-gradient z-50 text-white flex place-content-center sticky top-0'>
      <div className='w-full flex justify-between items-center px-4 sm:px-8 lg:px-14'>
        <Link
          to='/'
          className='flex items-center font-bold text-2xl font-montserrat'>
          <GiShop className='mr-2 text-3xl text-gray-400' />
          <span className='text-custom-blue text-3xl'>E</span>
          <span className='text-pink-400 ml-1 first-letter:text-green-300 uppercase'>- Shop</span>
        </Link>

        <ul className={`flex sm:gap-10 gap-4 sm:items-center sm:static absolute left-1/2 top-16 sm:shadow-none shadow-md
        ${navOpen ? 'h-fit sm:pb-0 pb-5' : 'h-0 overflow-hidden'} transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient text-white sm:w-fit w-1/2 sm:flex-row flex-col px-4 sm:px-0`}>


          <li className='font-medium transition-all duration-150'>
            <Link className={`${path === '/' ? 'text-white font-semibold' : 'text-gray-400'}`}
              to='/'>
              Home
            </Link>
          </li>

          <li className='font-medium transition-all duration-150'>
            <Link className={`${path === '/products' ? 'text-white font-semibold' : 'text-gray-400'}`}
              to='/products'>
              Products
            </Link>
          </li>

          <li className='font-medium transition-all duration-150'>
            <Link className={`${path === '/about' ? 'text-white font-semibold' : 'text-gray-400'}`}
              to='/about'>
              About
            </Link>
          </li>

          <li className='font-medium transition-all duration-150'>
            <Link className={`${path === '/contacts' ? 'text-white font-semibold' : 'text-gray-400'}`}
              to='/contacts'>
              Contacts
            </Link>
          </li>

          <li className='font-medium transition-all duration-150'>
            <Link className={`${path === '/cart' ? 'text-white font-semibold' : 'text-gray-400'}`}
              to='/cart'>
              <Badge
                showZero={false}
                badgeContent={cart.length || 0}
                color='primary'
                overlap='circular'
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <FaShoppingCart size={25} />
              </Badge>
            </Link>
          </li>

          {user && user.id ? (
            <UserMenu />
          ) : (
            <li className='font-medium transition-all duration-150'>
              <Link className='flex items-center space-x-2 px-4 py-1.5 bg-linear-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform'
                to='/login'>
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </li>
          )}

        </ul>

        <button
          onClick={() => setNavOpen(!navOpen)}
          className='sm:hidden flex items-center sm:mt-0 mt-2 cursor-pointer'>
          {navOpen ? (
            <RxCross2 className='text-white text-3xl' />
          ) : (
            <IoIosMenu className='text-white text-3xl' />
          )}
        </button>

      </div>
    </div>
  )
}

export default Navbar