import { createSlice } from '@reduxjs/toolkit';

import { SIDEBAR_ICONS } from '../../utils/constants';

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: {
		activeName: SIDEBAR_ICONS[0].name,
	},
	reducers: {
		changeMenuState: (state, action) => {
			state.activeName = action.payload;
		},
	},
});

export const { changeMenuState } = sidebarSlice.actions;

export const selectSidebarState = (state) => state.sidebar.activeName;

export default sidebarSlice.reducer;
