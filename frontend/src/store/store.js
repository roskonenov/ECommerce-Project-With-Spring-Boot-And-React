import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redusers/productReducer";
import { errorReducer } from "./redusers/errorReducer";
import { cartReducer } from "./redusers/cartReducer";
import { authReducer } from "./redusers/authReducer";
import { paymentMethodReducer } from "./redusers/PaymentMethodReducer";
import { adminReducer } from "./redusers/adminRedicer";
import { orderReducer } from "./redusers/orderReducer";

const user = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null;

const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const checkoutAddress = localStorage.getItem('checkoutAddress')
    ? JSON.parse(localStorage.getItem('checkoutAddress'))
    : [];

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
        admin: adminReducer,
        orders: orderReducer
    },
    preloadedState: {
        carts: { cart: cartItems },
        auth: { user: user, selectedCheckoutAddress: checkoutAddress},
    },
});

export default store;