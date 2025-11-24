import api from "../../api/api";

const CACHE_TTL = 60 * 10000 // 10 minutes

export const fetchProducts = (params) => async (dispatch, getState) => {
    try {
        const state = getState().products;
        const cache = state.productsCache;
        const timestamps = state.productsCacheTimeStamps;

        const isCategory = typeof params === 'number';
        const categoryId = isCategory ? params : null;

        if (categoryId) {
            const cachedData = cache[categoryId];
            const cachedTime = timestamps[categoryId];

            const isCacheValid = cachedData && cachedTime && Date.now() - cachedTime < CACHE_TTL;

            if (isCacheValid) {
                dispatch({
                    type: 'FETCH_PRODUCTS_FROM_CACHE',
                    payload: cachedData
                });
                dispatch({ type: 'IS_SUCCESS' });
                return;
            }
        }

        dispatch({ type: 'IS_FETCHING' });

        const endpoint = isCategory
            ? `/public/categories/${params}/products`
            : `/public/products?${params}`

        const { data } = await api.get(endpoint);

        dispatch({
            type: 'FETCH_PRODUCTS',
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
            categoryId,
        });

        dispatch({ type: 'IS_SUCCESS' });

    } catch (error) {
        console.log(error);
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message
        });
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: 'IS_FETCHING' });

        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: 'FETCH_CATEGORIES',
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });

        dispatch({ type: 'IS_SUCCESS' });
    } catch (error) {
        console.log(error);
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message
        });
    }
};

export const addToCart = (data, toast, qty = 1) =>
    (dispatch, getState) => {
        const state = getState().products;
        const productToAdd = state.products.find(
            item => item.id === data.id
        );
        const isQuantityExist = productToAdd.quantity >= qty;

        if (isQuantityExist) {
            dispatch({ type: 'ADD_CART', payload: { ...data, quantity: qty } });
            toast.success(`${productToAdd.name} added to cart!`)
            localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
        } else {
            toast.error('Out of Stock!')
        }
    };
