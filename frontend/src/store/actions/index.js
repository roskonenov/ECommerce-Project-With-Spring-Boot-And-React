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
            payload: error?.response?.data?.message || 'Failed to fetch Products!'
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
            payload: error?.response?.data?.message || 'Failed to fetch Categories!'
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
        toast.error(error?.response?.data?.message || 'Something went wrong! Try again later :(');

    } finally {
        setLoader(false);
    }
};

export const logOut = (navigate, toast, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post('/auth/signout');
        dispatch({ type: 'LOG_OUT' });
        localStorage.removeItem('auth');
        navigate('/');
        toast.success(data?.message || 'Logged out Seccessfully!');

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Something went wrong! Try again later :(');

    } finally {
        setLoader(false);
    }
};

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenModal, setSelectedAddress) => async (dispatch) => {
    dispatch({ type: 'IS_FETCHING' });

    try {
        if (addressId) {
            const { data } = await api.put(`/addresses/${addressId}`, { ...sendData, id: addressId });
            setSelectedAddress(data);
        } else {
            const { data } = await api.post('/addresses', sendData);
            setSelectedAddress(data);

        }

        dispatch(fetchUserAddresses());
        toast.success('Address Saved Successfilly!');
        dispatch({ type: 'IS_SUCCESS' });

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Something went wrong! Try again later :(');
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message
        });

    } finally {
        setOpenModal(false);
    }
};

export const fetchUserAddresses = () => async (dispatch) => {
    dispatch({ type: 'IS_FETCHING' });

    try {
        const { data } = await api.get(`/users/addresses`);
        dispatch({ type: 'FETCH_USER_ADDRESSES', payload: data });
        dispatch({ type: 'IS_SUCCESS' });

    } catch (error) {
        console.log(error);
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || 'Failed to fetch user Addresses'
        });
    }
};

export const setCheckoutAddress = (address) => {
    return {
        type: 'SELECT_CHECKOUT_ADDRESS',
        payload: address
    };
};

export const deleteUserAddress = (addresId, toast, setOpenDeleteAddressModal) => async (dispatch) => {
    dispatch({ type: 'IS_FETCHING' });
    try {
        await api.delete(`/addresses/${addresId}`);
        dispatch(fetchUserAddresses());
        dispatch({ type: 'REMOVE_CHECKOUT_ADDRESS' })
        dispatch({ type: 'IS_SUCCESS' });
        toast.success('The Address was deleted successfully!');

    } catch (error) {
        console.log(error);
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || 'Internal Error occurred'
        });
    } finally {
        setOpenDeleteAddressModal(false);
    };
};

export const setPaymentMethod = (method) => {
    return { type: 'SET_PAYMENT_METHOD', payload: method }
};

export const createUsersCart = (cartItemsData) => async (dispatch, getState) => {
    dispatch({ type: 'IS_FETCHING' });
    try {
        const { data } = await api.post('/carts/create', cartItemsData);
        dispatch({
            type: 'SET_USER_CART_PRODUCTS',
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.id,
        });
        dispatch({ type: 'IS_SUCCESS' });
        localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));

    } catch (error) {
        console.log(error);
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || 'Failed to create Users cart!'
        });
    }
};

export const getUsersCart = () => async (dispatch, getState) => {
    dispatch({ type: 'IS_FETCHING' });
    try {
        const { data } = await api.post('/carts/users/cart');
        dispatch({
            type: 'SET_USER_CART_PRODUCTS',
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.id,
        });
        dispatch({ type: 'IS_SUCCESS' });
        localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));

    } catch (error) {
        console.log(error);
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || 'Failed to get Users cart!'
        });
    }
};

export const createStripeClientSecret = (sendData) => async (dispatch, getState) => {
    dispatch({ type: 'IS_FETCHING' });
    try {
        const { data } = await api.post('/orders/users/stripe-client-secret', sendData);
        dispatch({ type: 'SET_CLIENT_SECRET', payload: data });
        dispatch({ type: 'IS_SUCCESS' });
        localStorage.setItem('clientSecret', JSON.stringify(getState().auth.clientSecret));

    } catch (error) {
        console.log(error);
        dispatch({
            type: 'IS_ERROR',
            payload: error?.response?.data?.message || 'Failed to create client secret!'
        });
    }
};