import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getDashboardOrders } from "../store/actions";

const useOrdersFilter = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const { user } = useSelector(state => state.auth);
    const isAdmin = user && user?.roles.includes('ROLE_ADMIN');

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

        params.set('pageNumber', currentPage - 1);

        dispatch(getDashboardOrders(params.toString(), isAdmin));

    }, [searchParams, dispatch, isAdmin]);
};

export default useOrdersFilter;