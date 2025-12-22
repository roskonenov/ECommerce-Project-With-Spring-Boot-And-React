import React from 'react';
import DashboardOverview from './DashboardOverview';
import { FaBoxOpen, FaShoppingCart, FaEuroSign } from "react-icons/fa";


const Dashboard = () => {
    const {productCount, totalRevenue, totalOrders} = {
    productCount: "34",
    totalOrders: "10",
    totalRevenue: "18241.62"
}
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