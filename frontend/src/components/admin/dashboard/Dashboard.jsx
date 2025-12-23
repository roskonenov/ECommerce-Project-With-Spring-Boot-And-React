import React, { useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import { FaBoxOpen, FaShoppingCart, FaEuroSign } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminAnalytics } from '../../../store/actions';


const Dashboard = () => {
    const dispatch = useDispatch();
    const {analytics: {productCount, totalRevenue, totalOrders}} = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getAdminAnalytics());
    }, [dispatch]);
    
    return (
        <div>
            <div className='flex md:flex-row flex-col mt-8 lg:justify-between border border-slate-400 rounded-lg bg-linear-to-r from-blue-50 to-blue-100 shadow-lg'>

                <DashboardOverview 
                title='Total Products'
                amount={productCount}
                Icon={FaBoxOpen}
                />

                <DashboardOverview 
                title='Total Orders'
                amount={totalOrders}
                Icon={FaShoppingCart}
                />

                <DashboardOverview 
                title='Total Revenue'
                amount={totalRevenue}
                Icon={FaEuroSign}
                revenue
                />

            </div>
        </div>
    )
}

export default Dashboard