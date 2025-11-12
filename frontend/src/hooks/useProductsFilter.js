import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
        const sortOrder = searchParams.get('sortby') || '';
        const categoryParam = searchParams.get('category') || null;
        const keyword = searchParams.get('keyword') || null;

        params.set('pageNumber', currentPage - 1);
        params.set('sortOrder', sortOrder);

        if (sortOrder) params.set('sortBy', 'price');
        if (categoryParam) params.set('category', categoryParam);
        if (keyword) params.set('keyword', keyword);
        
        dispatch(fetchProducts(params.toString()));

    }, [searchParams, dispatch]);
};

export default useProductFilter;