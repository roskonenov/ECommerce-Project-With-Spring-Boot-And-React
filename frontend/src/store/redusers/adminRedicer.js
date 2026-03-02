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
        
        case 'ADD_USER_ROLE':
            return {
                ...state,
                users: state.users.map(user => (
                    user.id === action.payload.id
                    ? action.payload
                    : user
                ))
            }

        default:
            return state;
    };
};