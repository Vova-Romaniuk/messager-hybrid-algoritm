import { createAsyncThunk } from '@reduxjs/toolkit';

// files with *.api.js must contains redux thunks for slice
export const fetchUserThunk = createAsyncThunk('user/fetchUser', async (_, {}) => {
	// TODO add method body
	// it`s only template
});
