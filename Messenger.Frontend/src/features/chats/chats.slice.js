import { createSlice } from '@reduxjs/toolkit';

export const chatsSlice = createSlice({
	name: 'chats',
	initialState: {
		activeUserChat: '',
	},
	reducers: {
		changeActiveUser: (state, action) => {
			state.activeUserChat = action.payload;
		},
	},
});

export const { changeActiveUser } = chatsSlice.actions;

export const selectChatsUserState = (state) => state.chats.activeUserChat;

export default chatsSlice.reducer;
