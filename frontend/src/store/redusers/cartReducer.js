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
                        ? {...product, ...productToAdd}
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

        case 'REMOVE_CART':
            return {
                ...state,
                cart: state.cart.filter(item => (
                    item.id !== action.payload.id
                )),
            };

        case 'SET_USER_CART_PRODUCTS': {
            const updatedCart = action.payload.map(product => {
                const existing = state.cart.find(item => item.id === product.id);

                return {
                    ...product,
                    cartQuantity: existing?.cartQuantity || 1
                };
            });

            return {
                ...state,
                cart: updatedCart,
                totalPrice: action.totalPrice,
                cartId: action.cartId
            };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};