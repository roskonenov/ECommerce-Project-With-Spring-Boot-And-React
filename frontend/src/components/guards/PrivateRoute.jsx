import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector(state => state.auth);
    const location = useLocation();
    const isAdmin = user && user?.roles?.includes('ROLE_ADMIN');
    const isSeller = user && user?.roles?.includes('ROLE_SELLER');
    const sellerAlowedPaths = ['/admin/products', '/admin/orders'];

    if (publicPage) return user ? <Navigate to='/' /> : <Outlet />;

    if (adminOnly && !isAdmin && !isSeller) return <Navigate to='/' />

    if (adminOnly && isSeller && !isAdmin) return sellerAlowedPaths.some(path => (
        location.pathname.startsWith(path)
    ))
        ? <Outlet />
        : <Navigate to='/' replace />

    return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute