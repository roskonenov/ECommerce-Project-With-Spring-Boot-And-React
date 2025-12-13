import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redusers/productReducer";
import { errorReducer } from "./redusers/errorReducer";
import { cartReducer } from "./redusers/cartReducer";
import { authReducer } from "./redusers/authReducer";
import { paymentMethodReducer } from "./redusers/PaymentMethodReducer";

const user = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null;

const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
    },
    preloadedState: {
        carts: {cart: cartItems},
        auth: {user: user},
    },
});

export default store;