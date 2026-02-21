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
                ...state,
                isLoading: true,
                errorMessage: null,
                categoryError: false
            };
        case 'IS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                btnLoader: false,
                categoryLoader: false,
                categoryError: false
            };
        case 'BTN_LOADER':
            return {
                ...state,
                btnLoader: true,
                errorMessage: null,
                categoryError: false
            }
        case 'IS_ERROR':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                btnLoader: false,
                categoryLoader: false
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