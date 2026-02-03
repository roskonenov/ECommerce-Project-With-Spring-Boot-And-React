import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getDashboardOrders } from "../store/actions";

const useOrdersFilter = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

        params.set('pageNumber', currentPage - 1);

        dispatch(getDashboardOrders(params.toString()));

    }, [searchParams, dispatch]);
};

export default useOrdersFilter;