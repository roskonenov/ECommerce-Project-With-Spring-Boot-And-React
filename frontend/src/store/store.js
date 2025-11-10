import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redusers/productReducer";
import { errorReducer } from "./redusers/errorReducer";

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer
    },
    preloadedState: {}
});

export default store;