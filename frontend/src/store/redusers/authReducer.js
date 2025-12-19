const initialState = {
    user: null,
    address: [],
    clientSecret: null,
    selectedCheckoutAddress: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'FETCH_USER_ADDRESSES':
            return {
                ...state,
                address: action.payload
            };

        case 'LOG_OUT':
            return initialState;

        case 'SELECT_CHECKOUT_ADDRESS':
            return {
                ...state,
                selectedCheckoutAddress: action.payload
            };

        case 'REMOVE_CHECKOUT_ADDRESS':
            return {
                ...state,
                selectedCheckoutAddress: null
            };

        case 'SET_CLIENT_SECRET':
            return {
                ...state,
                clientSecret: action.payload
            };

        case 'REMOVE_CLIENT_SECRET_AND_ADDRESS':
            return {
                ...state,
                clientSecret: null,
                selectedCheckoutAddress: null
            };

        default:
            return state;
    }

};