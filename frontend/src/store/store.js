import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redusers/productReducer";

export const store = configureStore({
    reducer: {
        products: productReducer
    },
    preloadedState: {}
});

export default store;