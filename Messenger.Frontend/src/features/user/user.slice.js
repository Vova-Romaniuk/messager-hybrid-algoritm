import { createSlice } from '@reduxjs/toolkit';

import { fetchCurrentUser } from './user.api';

const initialState = {
	data: null,
	loading: false,
	errors: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	extraReducers: {
		[fetchCurrentUser.pending]: (state) => {
			state.loading = true;
		},
		[fetchCurrentUser.fulfilled]: (state, { payload }) => {
			state.data = payload;
			state.loading = false;
		},
		[fetchCurrentUser.rejected]: (state) => {
			state.loading = false;
			// TODO add error to Errors array
		},
	},
});

export default userSlice.reducer;
