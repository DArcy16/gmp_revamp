/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import store from "../store";

const initialState = {
	data: [],
	cartCount: [],
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

export const fetchCartItems = createAsyncThunk("cart_items", async (token) => {
	try {
		const res = await axios.get(`${API}carts`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.data;
	} catch (err) {
		return err.message;
	}
});

export const addCartItem = createAsyncThunk("add_cart_item", async (props) => {
	try {
		const res = await axios.post(`${API}carts/add`, props.formData, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		});
        if(res.data.result) {
            toast.success(res.data.message)
        } else {
            toast.warn(res.data.message)
        }
		store.dispatch(fetchCartItems(props.token));
	} catch (error) {
		console.log(error);
		toast.error(error);
		return error;
	}
});

export const removeCartItem = createAsyncThunk(
	"remove_cart_item",
	async (props) => {
		try {
			const res = await axios.delete(`${API}carts/${props.id}`, {
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			});
			toast.success(res.data.message);
			return props.id;
		} catch (error) {
			return err.response.data.message;
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchCartItems.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchCartItems.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.data = action.payload;
		});
		builder.addCase(fetchCartItems.rejected, (state) => {
			state.status = "failed";
		});
		// builder.addCase(addCartItem.fulfilled, (state, action) => {
		// 	if (state.cartCount.some((item) => item.id === action.payload.id)) {
		// 		const index = state.cartCount.findIndex(
		// 			(item) => item.id === action.payload.id
		// 		);
		// 		state.cartCount[index] = action.payload;
		// 	} else {
		// 		state.cartCount = [...state.cartCount, action.payload];
		// 	}
		// });
		builder.addCase(removeCartItem.fulfilled, (state, action) => {
			state.data[0].cart_items = [
				...state.data[0].cart_items.filter(
					(item) => item.id !== action.payload
				),
			];
		});
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
