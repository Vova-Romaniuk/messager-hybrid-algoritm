import { createSlice } from '@reduxjs/toolkit';

import { TEST_USER_CHATS } from '../../utils/constants';
import { fetchChat, pinChat } from './chats.api';

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
		loading: false,
	},
	reducers: {
		changeActiveUser: (state, action) => {
			state.activeUserChat = action.payload;
		},
		changeUserChat: (state, action) => {
			state.usersChat = [...state.usersChat, action.payload];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(pinChat.fulfilled, (state, { payload }) => {
			const chats = [...state.usersChat];
			const index = chats.findIndex((x) => x.id === payload);
			if (index > -1) {
				chats.splice(index, 1, { ...chats[index], isPinned: !chats[index].isPinned });
			}
			state.usersChat = chats;
		});
		builder.addCase(fetchChat.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchChat.fulfilled, (state, { payload }) => {
			state.chat = payload;
			state.loading = false;
		});
		builder.addCase(fetchChat.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const { changeActiveUser, changeUserChat } = chatsSlice.actions;

export const selectChatsUserState = (state) => state.chats.activeUserChat;

export const selectUserChats = (state) => state.chats.usersChat;

export default chatsSlice.reducer;
