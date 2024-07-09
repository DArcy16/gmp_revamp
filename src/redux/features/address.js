/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import store from "../store";

const initialState = {
	data: [],
	cartAddressId: "",
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	addStatus: "idle",
	updateStatus: "idle",
	error: null,
};

export const fetchAddress = createAsyncThunk("address", async (token) => {
	try {
		const res = await axios.get(`${API}user/shipping/address`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data.data;
	} catch (err) {
		return err.message;
	}
});

export const addNewAddress = createAsyncThunk("add_address", async (props) => {
	try {
		const res = await axios.post(`${API}user/shipping/create`, props.formData, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		});
		if (res.data.result === true) {
			toast.success(res.data.message);
			props.setFormData({
				address: "",
				country_id: null,
				city_id: null,
				state_id: null,
				postal_code: "",
				phone: "",
			});
			props.closeModal();
			store.dispatch(fetchAddress(props.token));
		}
	} catch (err) {
		return err.message;
	}
});

export const updateAddress = createAsyncThunk("edit_address", async (props) => {
	try {
		const res = await axios.post(`${API}user/shipping/update`, props.formData, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		});
		if (res.data.result === true) {
			toast.success(res.data.message);
			props.setFormData({
				id: "",
				address: "",
				country_id: null,
				city_id: null,
				state_id: null,
				postal_code: "",
				phone: "",
			});
			props.closeModal();
			store.dispatch(fetchAddress(props.token));
		}
	} catch (err) {
		return err.message;
	}
});

export const deleteAddress = createAsyncThunk(
	"delete_address",
	async (props) => {
		try {
			const res = await axios.get(`${API}user/shipping/delete/${props.id}`, {
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			});

			if (res.data.result === true) {
				toast.success(res.data.message);
			}

			return props.id;
		} catch (error) {
			return error.message;
		}
	}
);

export const addCartAddress = createAsyncThunk("cart_address", async (props) => {
	try {
		const res = await axios.post(`${API}update-address-in-cart`, {address_id : props.id}, {
			headers: {
				Authorization: `Bearer ${props.token}`
			}
		});

		if (res.data.result === true) {
			toast.success(res.data.message);
			props.navigate("/delievery");

		} else {
			toast.error("Please, select your address.")
		}

		return props.id;

	} catch (error) {
		return error.message
	}
})

const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {
		setCartAddressId: (state, action) => {
			state.cartAddressId = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchAddress.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchAddress.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.data = action.payload;
		});
		builder.addCase(fetchAddress.rejected, (state) => {
			state.status = "failed";
		});
		builder.addCase(addNewAddress.pending, (state) => {
			state.addStatus = "loading";
		});
		builder.addCase(addNewAddress.fulfilled, (state) => {
			state.addStatus = "succeeded";
		});
		builder.addCase(addNewAddress.rejected, (state) => {
			state.addStatus = "failed";
		});
		builder.addCase(updateAddress.pending, (state) => {
			state.updateStatus = "loading";
		});
		builder.addCase(updateAddress.fulfilled, (state) => {
			state.updateStatus = "succeeded";
		});
		builder.addCase(updateAddress.rejected, (state) => {
			state.updateStatus = "failed";
		});
		builder.addCase(deleteAddress.fulfilled, (state, action) => {
			state.data = state.data.filter((item) => item.id !== action.payload);
		});
		builder.addCase(addCartAddress.fulfilled, (state, action) => {
			state.cartAddressId = action.payload
		})
	},
});

export const addressActions = addressSlice.actions;
export default addressSlice.reducer;
