/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../hooks/useFetch";

const initialState = {
	data: {},
	error: null,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const fetchUserInfo = createAsyncThunk("user/info", async (props) => {
	try {
		const res = await axios.get(`${API}auth/user`, {
			headers: {
				Authorization: `Bearer ${props.token}`,
			},
		});

		return res.data;
	} catch (error) {
		return error.message;
	}
});

const userInfoSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
        .addCase(fetchUserInfo.pending, (state) => {
			state.status = "loading";
		})
        .addCase(fetchUserInfo.fulfilled, (state,action) => {
            state.status = "succeeded";
            state.data = action.payload;
        })
        .addCase(fetchUserInfo.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message
        })
	},
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;
