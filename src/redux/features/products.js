/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import { API } from "../../hooks/useFetch";
0
const initialState = {
	data: [],
    details : {},
	error: null,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const fetchProductDetail = createAsyncThunk("products/detail", async(props) => {
	try {
		const res = await axios.get(`${API}products/${props.id}`, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		});

		return res.data;
	} catch (error) {
		return error.message;
	}
})

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers:{},
	extraReducers(builder) {
		builder.addCase(
			fetchProductDetail.fulfilled, (state, action) => {
				state.details = action.payload
			}
		)
	}
})

export const productsAction = productsSlice.actions;
export default productsSlice.reducer;