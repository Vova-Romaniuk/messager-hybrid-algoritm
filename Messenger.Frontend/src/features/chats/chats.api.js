import { createAsyncThunk } from '@reduxjs/toolkit';

export const pinChat = createAsyncThunk(
	'chat/pinChat',
	async (id, { fulfillWithValue, rejectWithValue }) => {
		try {
			// TODO add request
			return fulfillWithValue(id);
		} catch (error) {
			return rejectWithValue();
		}
	}
);
