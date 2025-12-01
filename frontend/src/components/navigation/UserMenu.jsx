import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import Backdrop from './Backdrop';
import { logOut } from '../../store/actions';
import toast from 'react-hot-toast';


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logOut(navigate, toast));
    };

    return (
        <div className='relative z-30'>

            {open && <Backdrop />}

            <div
                className='cursor-pointer rounded-full hover:shadow-md transition'
                onClick={handleClick}
            >
                <Avatar src='' alt='Menu'></Avatar>
            </div>
            <Menu
                sx={{ width: '400px' }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                        sx: { width: 160, background: '#c9ced6ff'}
                    },
                }}
            >
                <Link to='/profile'>
                    <MenuItem
                        className='flex gap-2'
                        onClick={handleClose}>
                        <BiUser className='text-xl' />
                        <span className='text-[16px] font-bold'>{user?.username}</span>
                    </MenuItem>
                </Link>

                <Link to='/profile/orders'>
                    <MenuItem
                        className='flex gap-2'
                        onClick={handleClose}>
                        <FaShoppingCart className='text-xl' />
                        <span className='text-[16px] font-semibold'>My Order</span>
                    </MenuItem>
                </Link>

                <MenuItem
                    className='flex gap-2'
                    onClick={handleLogOut}>
                    <div className='bg-button-gradient w-full rounded-sm text-white flex gap-2 justify-center items-center py-1 px-4 font-semibold'>
                        <IoIosExit className='text-xl' />
                        <span className='text-[16px] font-semibold'>Logout</span>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default UserMenu