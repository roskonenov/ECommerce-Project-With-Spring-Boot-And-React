const initialState = {
    user: null,
    address: [],
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
            }

        case 'LOG_OUT':
            return initialState;

        default:
            return state;
    }

};