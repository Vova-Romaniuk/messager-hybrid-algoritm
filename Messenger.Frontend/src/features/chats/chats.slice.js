import { createSlice } from '@reduxjs/toolkit';

import { pinChat, fetchUserChats, fetchChat } from './chats.api';

export const chatsSlice = createSlice({
	name: 'chats',
	initialState: {
		activeUserChat: '',
		userChats: null,
		chat: {
			id: null,
			icon: null,
			lastMessage: null,
			userName: null,
			isPinned: null,
			messages: [],
		},
		loading: false,
		isAddUserPopup: false,
		isSelectEncryption: false,
		sidebarLoading: false,
		isOpenChat: false,
		hub: {
			hubConnection: null,
			connected: false,
		},
		notificationMessages: [],
		userWhichCreateChat: {},
	},
	reducers: {
		setConnection: (state, { payload }) => {
			state.hub.hubConnection = payload.hubConnection;
			state.hub.connected = payload.connected;
		},
		addNotificationMessage: (state, { payload }) => {
			state.notificationMessages = [...state.notificationMessages, payload];
		},
		removeNotificationMessage: (state, { payload }) => {
			state.notificationMessages = state.notificationMessages.filter(
				(message) => message.id !== payload
			);
		},
		changeActiveUser: (state, action) => {
			state.activeUserChat = action.payload;
		},
		changeUserChat: (state, action) => {
			state.userChats = [...state.userChats, action.payload];
		},
		changeUserWhichCreateChat: (state, action) => {
			state.userWhichCreateChat = { ...state.userWhichCreateChat, ...action.payload };
		},
		changeIsAddUserPopup: (state) => {
			state.isAddUserPopup = !state.isAddUserPopup;
		},
		changeIsSelectEncryption: (state) => {
			state.isSelectEncryption = !state.isSelectEncryption;
		},
		changeChat: (state, action) => {
			state.chat = { ...state.chat, ...action.payload };
		},
		changeChat: (state, action) => {
			state.chat = { ...state.chat, ...action.payload };
		},
		changeChatMessages: (state, action) => {
			state.chat.messages = [...state.chat.messages, action.payload];
		},
		changeLastMessage: (state, { payload }) => {
			const index = state.userChats.findIndex((chat) => chat.id === payload.roomId);
			state.userChats[index].message = payload;
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
		changeIsOpenChat: (state) => {
			state.isOpenChat = !state.isOpenChat;
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

export const {
	changeActiveUser,
	changeUserChat,
	changeChatMessages,
	deleteAllMessages,
	changeChat,
	changeIsOpenChat,
	setConnection,
	changeIsAddUserPopup,
	changeIsSelectEncryption,
	changeUserWhichCreateChat,
	addNotificationMessage,
	removeNotificationMessage,
	changeLastMessage,
} = chatsSlice.actions;

export const selectChatsUserState = (state) => state.chats.activeUserChat;

export const selectUserChats = (state) => state.chats.userChats;

export const selectChat = (state) => state.chats.chat;

export const selectIsAddUserPopup = (state) => state.chats.isAddUserPopup;

export const selectNotificationMessages = (state) => state.chats.notificationMessages;

export const selectUserWhichCreateChat = (state) => state.chats.userWhichCreateChat;

export const selectIsSelectEncryption = (state) => state.chats.isSelectEncryption;

export const selectChatLoading = (state) => state.chats.loading;

export const selectChatsLoading = (state) => state.chats.sidebarLoading;

export const selectIsOpenChat = (state) => state.chats.isOpenChat;

export const selectHubConnection = (state) => state?.chats?.hub.hubConnection;

export const selectHubConnectionState = (state) => state?.chats?.hub.connected;

export default chatsSlice.reducer;
