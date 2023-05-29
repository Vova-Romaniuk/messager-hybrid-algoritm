import { createSlice } from '@reduxjs/toolkit';

import { initialState } from '../initialState';

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: initialState.sidebar,
	reducers: {
		changeMenuState: (state, action) => {
			state.activeName = action.payload;
		},
		reset: (state) => {
			Object.assign(state, initialState.sidebar);
		},
	},
});

export const { changeMenuState, reset } = sidebarSlice.actions;

export const selectSidebarState = (state) => state.sidebar.activeName;

export default sidebarSlice.reducer;
