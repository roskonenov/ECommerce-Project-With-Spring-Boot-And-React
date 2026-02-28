const initialState = {
    analytics: {},
    users: [],
    pagination: {}
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADMIN_ANALYTICS':
            return {
                ...state,
                analytics: action.payload
            }

        case 'FETCH_ADMIN_USERS':
            return {
                ...state,
                users: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                }
            }
        default:
            return state;
    };
};