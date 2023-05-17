import { createSlice } from '@reduxjs/toolkit';

import { fetchChat, fetchUserChats, pinChat } from './chats.api';

export const chatsSlice = createSlice({
	name: 'chats',
	initialState: {
		activeUserChat: '',
		userChats: null,
		chat: {
			id: null,
			image: null,
			lastMessage: null,
			userName: null,
			isPinned: null,
			messages: [],
		},
		loading: false,
		sidebarLoading: false,
	},
	reducers: {
		changeActiveUser: (state, action) => {
			state.activeUserChat = action.payload;
		},
		changeUserChat: (state, action) => {
			state.userChats = [...state.userChats, action.payload];
		},
		changeChatMessages: (state, action) => {
			state.chat.messages = [...state.chat.messages, action.payload];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(pinChat.fulfilled, (state, { payload }) => {
			const chats = [...state.userChats];
			const index = chats.findIndex((x) => x.id === payload);
			if (index > -1) {
				chats.splice(index, 1, { ...chats[index], isPinned: !chats[index].isPinned });
			}
			state.userChats = chats;
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
		builder.addCase(fetchUserChats.fulfilled, (state, { payload }) => {
			state.userChats = payload;
			state.sidebarLoading = false;
		});
		builder.addCase(fetchUserChats.pending, (state) => {
			state.sidebarLoading = true;
		});
		builder.addCase(fetchUserChats.rejected, (state) => {
			state.sidebarLoading = false;
		});
	},
});

export const { changeActiveUser, changeUserChat, changeChatMessages } = chatsSlice.actions;

export const selectChatsUserState = (state) => state.chats.activeUserChat;

export const selectUserChats = (state) => state.chats.userChats;

export const selectChat = (state) => state.chats.chat;

export const selectChatLoading = (state) => state.chats.loading;

export const selectChatsLoading = (state) => state.chats.sidebarLoading;

export default chatsSlice.reducer;
