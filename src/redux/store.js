import {configureStore } from '@reduxjs/toolkit'
import auth from './features/auth';
import userInfo from './features/userInfo';
import products from "./features/products"
import cart from "./features/cart"
import address from './features/address';

const store = configureStore({
    reducer: {
        auth,
        userInfo,
        products,
        cart,
        address 
    }
});

export default store;