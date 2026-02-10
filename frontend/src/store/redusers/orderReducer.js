const initialState = {
    adminOrders: [],
    pagination: {},
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ADMIN_ORDERS':
            return {
                ...state,
                adminOrders: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                }
            }
        case 'UPDATE_ORDER_STATUS':
            return {
                ...state,
                adminOrders: state.adminOrders.map(order => (
                    order.id === action.payload.id
                    ? action.payload
                    : order
                ))
            }    
        default:
            return state;
    };
};