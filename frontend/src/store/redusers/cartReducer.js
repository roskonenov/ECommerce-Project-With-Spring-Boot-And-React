const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART': {
            const productToAdd = action.payload;
            const isProductExistInCart = state.cart.find(
                product => product.id === productToAdd.id
            );

            if (isProductExistInCart) {
                const updatedCart = state.cart.map(product => {
                    return product.id === productToAdd.id
                        ? productToAdd
                        : product
                });
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, productToAdd]
                };
            }
        }
        default:
            return state;;
    }
};