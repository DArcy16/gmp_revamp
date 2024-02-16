import {configureStore } from '@reduxjs/toolkit'
import auth from './features/auth';
import userInfo from './features/userInfo';
import products from "./features/products"
import cart from "./features/cart"

const store = configureStore({
    reducer: {
        auth,
        userInfo,
        products,
        cart
    }
});

export default store;