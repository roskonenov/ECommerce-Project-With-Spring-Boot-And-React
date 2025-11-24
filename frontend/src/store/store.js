import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redusers/productReducer";
import { errorReducer } from "./redusers/errorReducer";
import { cartReducer } from "./redusers/cartReducer";

const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer
    },
    preloadedState: {
        carts: {cart: cartItems}
    }
});

export default store;