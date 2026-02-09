import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import { useState } from 'react';
import Spinner from '../../shared/Spinner';

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Accepted'];

const UpdateOrderForm = ({ setOpen, selectedItem, loader, setLoader }) => {
    const [orderStatus, setOrderStatus] = useState(selectedItem?.status || 'Acceped');
    const [error, setError] = useState('');
    return (
        <div className='py-5 relative h-full'>
            <form className='space-y-4'
                onSubmit={''}>
                <FormControl
                    fullWidth
                    variant='outlined'
                    error={!!error}>
                    <InputLabel id='order-status-label'>Order Status</InputLabel>
                    <Select
                        labelId='order-status-label'
                        label='Order Status'
                        value={orderStatus}
                        onChange={(e) => {
                            setOrderStatus(e.target.value);
                            setError('');
                        }}>
                        {ORDER_STATUSES.map(status => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>

                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
                <div className='flex w-full justify-between items-center absolute bottom-20'>
                    <Button
                        disabled={loader}
                        onClick={() => setOpen(false)}
                        variant='outlined'
                        className='text-white py-2.5 px-4 font-medium'>
                        Cancel
                    </Button>
                    <Button
                        loading={loader}
                        disabled={loader}
                        type='submit'
                        variant='contained'
                        color='primary'
                        className='bg-custom-blue text-white py-2.5 px-4 font-medium'
                    >
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateOrderForm