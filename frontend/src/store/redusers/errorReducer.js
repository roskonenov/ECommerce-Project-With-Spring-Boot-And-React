const initialState = {
    isLoading: false,
    errorMessage: null,
    btnLoader: false,
    categoryLoader: false,
    categoryError: false,
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
                btnLoader: false,
                categoryLoader: false,
                categoryError: false
            };
        case 'IS_ERROR':
            return {
                isLoading: false,
                errorMessage: action.payload,
                btnLoader: false
            };
        case 'CATEGORY_LOADER':
            return {
                ...state,
                categoryLoader: true,
                categoryError: null,
                errorMessage: null
            };
        case 'CATEGORY_ERROR':
            return {
                ...state,
                categoryError: true,
                categoryLoader: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }

};