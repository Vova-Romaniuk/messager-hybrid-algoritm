import { createSlice } from '@reduxjs/toolkit';

import { connectToHub } from './hub.api';

const hubSlice = createSlice({
	name: 'hub',
	initialState: {
		connection: null,
	},
	extraReducers: (builder) => {
		builder.addCase(connectToHub.fulfilled, (state, action) => {
			state.connection = action.payload;
		});
	},
});

export const selectHubConnection = (state) => state.hub.connection;

export default hubSlice.reducer;
