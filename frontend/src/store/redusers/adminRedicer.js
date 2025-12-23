const initialState = {
    analytics: {}
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADMIN_ANALYTICS':
            return {
                ...state,
                analytics: action.payload
            }
        default:
            return state;
    };
};