import { createSlice } from '@reduxjs/toolkit';

import { initialState } from '../initialState';
import { fetchCurrentUser, updateUserInfo, uploadUserImage, fetchUsers } from './user.api';

const userSlice = createSlice({
	name: 'user',
	initialState: initialState.user,
	reducers: {
		reset: (state) => {
			Object.assign(state, initialState.user);
		},
	},
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
		builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
			state.users = payload;
			state.usersLoading = false;
		});
		builder.addCase(fetchUsers.pending, (state) => {
			state.usersLoading = true;
		});
		builder.addCase(fetchUsers.rejected, (state) => {
			state.usersLoading = false;
		});
	},
});

export const selectUserLoading = (state) => state.user.loading;

export const selectUserData = (state) => state.user.data;

export const selectUserId = (state) => state.user?.data?.id;

export const selectUsers = (state) => state.user.users;

export const selectUsersLoading = (state) => state.user.usersLoading;

export const { reset } = userSlice.actions;

export default userSlice.reducer;
