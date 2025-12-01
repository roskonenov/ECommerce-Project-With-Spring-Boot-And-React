import api from "../../api/api";

const CACHE_TTL = 60 * 10000 // 10 minutes

export const fetchProducts = (params) => async (dispatch, getState) => {
    try {
        const { productsCache, productsCacheTimeStamps } = getState().products;

        const isCategory = typeof params === 'number';
        const categoryId = isCategory ? params : null;

        if (categoryId) {
            const cachedData = productsCache[categoryId];
            const cachedTime = productsCacheTimeStamps[categoryId];

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
        const { products } = getState().products;
        const productToAdd = products.find(
            item => item.id === data.id
        );
        const isQuantityExist = productToAdd.quantity >= qty;

        if (isQuantityExist) {
            dispatch({ type: 'ADD_CART', payload: { ...data, cartQuantity: qty } });
            toast.success(`${productToAdd.name} added to cart!`)
            localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
        } else {
            toast.error('Out of Stock!')
        }
    };

export const increaseCartItemQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {

        const { cart } = getState().carts;
        const getProduct = cart.find(
            item => item.id === data.id
        );

        const newQuantity = currentQuantity + 1;
        const isQuantityExist = getProduct.quantity >= newQuantity;

        if (isQuantityExist) {
            setCurrentQuantity(newQuantity);

            dispatch({
                type: 'ADD_CART',
                payload: { ...data, cartQuantity: newQuantity }
            });

            localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
        } else {
            toast.error('Item\'s quantity limit reached!')
        }
    }

export const decreaseCartItemQuantity = (data, newQuantity) =>
    (dispatch, getState) => {
        dispatch({
            type: 'ADD_CART',
            payload: { ...data, cartQuantity: newQuantity }
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
    }

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({
        type: 'REMOVE_CART',
        payload: data
    });

    toast.success(`${data.name} removed from cart!`)
    localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
};

export const authenticateUserLogin = (loginData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post('/auth/signin', loginData);
        dispatch({ type: 'LOGIN_USER', payload: data });
        reset();
        localStorage.setItem('auth', JSON.stringify(data));
        navigate('/')
        toast.success('Login Successful!');

    } catch (error) {

        toast.error(error?.response?.data?.message || 'Something went wrong! Try again later :(')

    } finally {
        setLoader(false);
    }
};

export const registerUser = (loginData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post('/auth/signup', loginData);
        reset();
        toast.success(data?.message || 'User Registered Successfully!')
        dispatch(authenticateUserLogin(loginData, toast, reset, navigate, setLoader));

    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong! Try again later :(')

    } finally {
        setLoader(false);
    }
};

export const logOut = (navigate, toast) => (dispatch) => {
    dispatch({type: 'LOG_OUT'});
    localStorage.removeItem('auth');
    navigate('/');
    toast.success('Logged out Seccessfully!')
};