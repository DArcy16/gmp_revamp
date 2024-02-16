/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import axios from "axios";

import { toast } from "react-toastify";

import { API } from "../../hooks/useFetch";

const cookies = new Cookies();
const userId = cookies.get("userId") || null;
const token = cookies.get("token") || null;

const initialState = {
	auth: {
		userId: userId,
		token: token,
	},
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

export const login = createAsyncThunk("user/login", async (props) => {
	try {
		const res = await axios.post(`${API}auth/signin`, props.formData);
		toast.success(res?.data?.message);
		cookies.set("token", res?.data?.access_token, { path: "/" });
		cookies.set("userId", res?.data?.user?.id, { path: "/" });
		props.navigate("/", { replace: true });
		return res.data;
	} catch (err) {
		toast.error(err.response.data.message);
		return err.message;
	}
});

export const logout = (navigate) => {
	return async (dispatch) => {
		cookies.remove("token", { path: "/" });
		cookies.remove("userId", { path: "/" });
		dispatch(authActions.resetAuth());
		toast.success("Successfully Logout !");
		navigate("/", { replace: true });
	};
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuth: (state) => {
			(state.auth.userId = null), (state.auth.token = null);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(login.pending, (state) => {
				state.status = "loading";
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.auth = {
					userId: action.payload.user.id,
					token: action.payload.access_token,
				};
			})
			.addCase(login.rejected, (state) => {
				state.status = "failed";
				// state.error = action.error.message
			});
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
