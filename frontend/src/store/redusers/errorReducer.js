const initialState = {
    isLoading: false,
    errorMessage: null,
    btnLoader: false
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_FETCHING':
            return {
                isLoading: true,
                errorMessage: null,
                btnLoader: true
            };
        case 'IS_SUCCESS':
            return {
                isLoading: false,
                errorMessage: null,
                btnLoader: false
            };
        case 'IS_ERROR':
            return {
                isLoading: false,
                errorMessage: action.payload,
                btnLoader: false
            };
        default:
            return state;
    }

};