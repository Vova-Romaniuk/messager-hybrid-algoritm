import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
	loading: false,
	errors: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
});

export default userSlice.reducer;
