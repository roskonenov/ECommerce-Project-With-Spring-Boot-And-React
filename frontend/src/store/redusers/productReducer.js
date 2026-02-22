const initialState = {
    products: [],
    categories: [],
    pagination: {},
    categoryPagination: {},
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
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product => (
                    product.id === action.payload.id
                        ? action.payload
                        : product
                ))
            }
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload]
            }

        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload.id)
            }

        case 'FETCH_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
                categoryPagination: {
                    ...state.categoryPagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            }

        case 'CREATE_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map(cat =>
                    cat.id === action.payload.id
                        ? action.payload
                        : cat
                )
            }
        default:
            return state;
    }
};