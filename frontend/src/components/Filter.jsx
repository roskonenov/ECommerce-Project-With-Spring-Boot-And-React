import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import { BsCoin } from "react-icons/bs";
import { useSearchParams } from 'react-router-dom';


const Filter = () => {
    const categories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Furniture' },
        { id: 4, name: 'Books' },
        { id: 5, name: 'Toys' },
    ];

    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCategory(searchParams.get('category') || 'all');
        setSearchTerm(searchParams.get('keyword') || '');
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchParams(s => {
                const params = new URLSearchParams(s);
                searchTerm.trim()
                    ? params.set('keyword', searchTerm.trim())
                    : params.delete('keyword');
                return params;
            });
        }, 700);

        return () => clearTimeout(handler);
    }, [searchTerm, setSearchParams]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        setSearchParams(s => {
            const params = new URLSearchParams(s);

            selectedCategory === 'all'
                ? params.delete('category')
                : params.set('category', selectedCategory);
            return params;
        });
        setCategory(e.target.value);
    };

    const toggleSortByPrice = () => {
        setSearchParams(s => {
            const params = new URLSearchParams(s);
            params.get('sortby') === 'asc'
                ? params.set('sortby', 'desc')
                : params.set('sortby', 'asc');
            return params;
        });
    };

    const handleClearFilters = () => {
        setSearchParams(s => {
            s.forEach(param => s.delete(param));
        });
    };

    return (
        <div className='flex lg:flex-row flex-col-reverse lg:justify-between place-items-center'>
            {/* Search Bar */}
            <div className='relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full'>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder='Search Products'
                    className='border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                <FaSearch className='absolute left-3 text-slate-800' size={20} />
            </div>

            {/* Category Selection */}
            <div className='flex sm:flex-row flex-col gap-4 items-center'>
                <FormControl
                    className='text-slate-800 border-slate-700'
                    variant='outlined'
                    size='small'>
                    <InputLabel id='category-select-label'>Category</InputLabel>
                    <Select
                        className='min-w-[120px] text-slate-800 border-slate-700'
                        labelId='category-select-label'
                        value={category}
                        onChange={handleCategoryChange}
                        label='Category'>
                        <MenuItem value='all'>All</MenuItem>
                        {categories.map(item => (
                            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Sort Button & Sort Filter */}
                <Tooltip title={`Sort by price: ${searchParams.get('sortby') === 'asc' ? 'desc' : 'asc'}`}>
                    <Button
                        variant='contained'
                        color='primary'
                        className='flex items-center gap-2 h-10'
                        onClick={toggleSortByPrice}>
                        Sort By Price
                        {searchParams.get('sortby')
                            ? searchParams.get('sortby') === 'asc'
                                ? <FaArrowDown />
                                : <FaArrowUp />
                            : <BsCoin />}

                    </Button>
                </Tooltip>
                <button
                    className='flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer'
                    onClick={handleClearFilters}>
                    <FiRefreshCw className='font-semibold' size={16} />
                    <span className='font-semibold'>Clear Filter</span>
                </button>
            </div>
        </div>
    )
}

export default Filter