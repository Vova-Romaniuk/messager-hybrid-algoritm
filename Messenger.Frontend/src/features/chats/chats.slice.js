import { createSlice } from '@reduxjs/toolkit';

import { TEST_USER_CHATS } from '../../utils/constants';

export const chatsSlice = createSlice({
	name: 'chats',
	initialState: {
		activeUserChat: '',
		usersChat: TEST_USER_CHATS,
		chat: {
			id: null,
			image: null,
			lastMessage: null,
			userName: null,
			isPinned: null,
			messages: [],
		},
	},
	reducers: {
		changeActiveUser: (state, action) => {
			state.activeUserChat = action.payload;
		},
		changeUserChat: (state, action) => {
			state.usersChat = [...state.usersChat, action.payload];
		},
	},
});

export const { changeActiveUser, changeUserChat } = chatsSlice.actions;

export const selectChatsUserState = (state) => state.chats.activeUserChat;

export const selectUserChats = (state) => state.chats.usersChat;

export default chatsSlice.reducer;
