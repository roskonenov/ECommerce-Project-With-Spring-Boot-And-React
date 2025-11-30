import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector(state => state.auth)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='relative z-30'>
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
                        sx: { width: 160, background: '#dbdfe6ff'}
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
                    onClick={handleClose}>
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