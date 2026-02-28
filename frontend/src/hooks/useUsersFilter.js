import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getDashboardUsers } from "../store/actions";

const useUsersFilter = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

        params.set('pageNumber', currentPage - 1);

        dispatch(getDashboardUsers(params.toString()));

    }, [searchParams, dispatch]);
};

export default useUsersFilter;