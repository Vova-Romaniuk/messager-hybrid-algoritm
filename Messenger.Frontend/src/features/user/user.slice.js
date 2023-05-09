import { createSlice } from '@reduxjs/toolkit';

import { fetchCurrentUser, updateUserInfo, uploadUserImage } from './user.api';

const initialState = {
	data: null,
	loading: false,
	errors: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCurrentUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
		});
		builder.addCase(fetchCurrentUser.rejected, (state) => {
			state.loading = false;
			// TODO add error to Errors array
		});
		builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.loading = false;
		});
		builder.addCase(updateUserInfo.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUserInfo.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(uploadUserImage.fulfilled, (state, { payload }) => {
			state.data = { ...state.data, image: payload };
			state.loading = false;
		});
		builder.addCase(uploadUserImage.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(uploadUserImage.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const selectUserLoading = (state) => state.user.loading;

export const selectUserData = (state) => state.user.data;

export const selectUserId = (state) => state.user.data?.id;

export default userSlice.reducer;
