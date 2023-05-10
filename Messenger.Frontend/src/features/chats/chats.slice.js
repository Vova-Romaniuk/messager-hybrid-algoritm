import { createSlice } from '@reduxjs/toolkit';

import { TEST_USER_CHATS, messages } from '../../utils/constants';
import { fetchChat, pinChat } from './chats.api';

export const chatsSlice = createSlice({
	name: 'chats',
	initialState: {
		activeUserChat: '',
		usersChat: TEST_USER_CHATS,
		chat: {
			id: null,
			icon: null,
			lastMessage: null,
			userName: null,
			isPinned: null,
			messages: [...messages],
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
		changeChat: (state, action) => {
			state.chat = { ...state.chat, ...action.payload };
		},
		changeChatMessages: (state, action) => {
			state.chat.messages = [...state.chat.messages, action.payload];
		},
		deleteAllMessages: (state, action) => {
			if (action.payload === state.chat.id) {
				return {
					...state,
					chat: {
						...state.chat,
						messages: [],
					},
				};
			}
			return state;
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

export const {
	changeActiveUser,
	changeUserChat,
	changeChatMessages,
	deleteAllMessages,
	changeChat,
} = chatsSlice.actions;

export const selectChatsUserState = (state) => state.chats.activeUserChat;

export const selectUserChats = (state) => state.chats.usersChat;

export const selectChat = (state) => state.chats.chat;

export default chatsSlice.reducer;
