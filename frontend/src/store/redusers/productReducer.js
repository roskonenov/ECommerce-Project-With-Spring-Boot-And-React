const initialState = {
    products: null,
    categories: null,
    pagination: {},
    productsCache: {},
    productsCacheTimeStamps: {},
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_FROM_CACHE':
            return {
                ...state,
                products: action.payload
            };

        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
                ...(action.categoryId && {
                    productsCache: {
                        ...state.productsCache,
                        [action.categoryId]: action.payload
                    },
                    productsCacheTimeStamps: {
                        ...state.productsCacheTimeStamps,
                        [action.categoryId]: Date.now()
                    }
                })
            };
            
        case 'FETCH_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
            }
        default:
            return state;
    }
};