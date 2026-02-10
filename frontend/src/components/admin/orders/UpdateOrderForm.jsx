import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatusFromAdminDashboard } from '../../../store/actions';

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Accepted'];

const UpdateOrderForm = ({ setOpen, selectedItem }) => {
    const [orderStatus, setOrderStatus] = useState(selectedItem?.status || 'Acceped');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { errorMessage, btnLoader } = useSelector(state => state.errors);

    const updateOrderStatus = (e) => {
        e.preventDefault();
        if (!orderStatus) {
            setError('Order Status is Required!');
            return;
        }

        dispatch(updateOrderStatusFromAdminDashboard(selectedItem.id, orderStatus, toast, setOpen));
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }, [errorMessage]);

    return (
        <div className='py-5 relative h-full'>
            <form className='space-y-4'
                onSubmit={updateOrderStatus}>
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
                        disabled={btnLoader}
                        onClick={() => setOpen(false)}
                        variant='outlined'
                        className='text-white py-2.5 px-4 font-medium'>
                        Cancel
                    </Button>
                    <Button
                        loading={btnLoader}
                        disabled={btnLoader}
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