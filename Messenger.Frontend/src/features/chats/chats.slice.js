import { createSlice } from '@reduxjs/toolkit';

import { initialChatState, initialState } from '../initialState';
import { fetchUserChats, fetchChat, cleanChat, deleteChat, fetchChatPreview } from './chats.api';

export const chatsSlice = createSlice({
	name: 'chats',
	initialState: initialState.chat,
	reducers: {
		setConnection: (state, { payload }) => {
			state.hub.hubConnection = payload.hubConnection;
			state.hub.connected = payload.connected;
		},
		addNotificationMessage: (state, { payload }) => {
			state.notificationMessages = [...state.notificationMessages, payload];
		},
		removeNotificationMessage: (state, { payload }) => {
			state.notificationMessages = state.notificationMessages?.filter(
				(message) => message.id !== payload
			);
		},
		changeActiveUser: (state, action) => {
			state.activeUserChat = action.payload;
		},
		addPinned: (state, { payload }) => {
			state.pinned = [...state.pinned, payload];
		},
		removePinned: (state, { payload }) => {
			state.pinned = state.pinned.filter((item) => item !== payload);
		},
		changeUserChat: (state, action) => {
			state.userChats = [...state.userChats, action.payload];
		},
		addUserChats: (state, { payload }) => {
			state.userChats = [state.userChats, payload];
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
		changeChatMessages: (state, action) => {
			state.chat.messages = [...state.chat.messages, action.payload];
		},
		changeLastMessage: (state, { payload }) => {
			const index = state.userChats?.findIndex((chat) => chat.id === payload.roomId);
			state.userChats[index].message = payload;
		},
		deleteAllMessages: (state, action) => {
			if (action.payload === state.chat?.id) {
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
		openChats: (state, { payload }) => {
			state.isOpenChat = payload;
		},
		addUnReadMessageCount: (state, { payload }) => {
			const index = state.userChats?.findIndex((chat) => chat.id === payload);
			state.userChats[index].notSeenCount++;
		},
		removeUnReadMessageCount: (state, { payload }) => {
			const index = state.userChats?.findIndex((chat) => chat.id === payload);
			if (state.userChats?.map(({ id }) => id).includes(payload)) {
				state.userChats[index].notSeenCount = 0;
			}
		},
		changeShowReadMessage: (state) => {
			state.showReadMessage = !state.showReadMessage;
		},
		reset: (state) => {
			Object.assign(state, initialState.chat);
		},
	},
	extraReducers: (builder) => {
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
		builder.addCase(cleanChat.fulfilled, (state, { payload }) => {
			state.chat.messages = [];

			const index = state.userChats?.findIndex((x) => x.id === payload);
			if (index !== null && state.userChats) {
				state.userChats[index].message = null;
			}
		});
		builder.addCase(deleteChat.fulfilled, (state, { payload }) => {
			state.chat = initialChatState;
			state.userChats = state.userChats.filter((x) => x.id !== payload);
		});
		builder.addCase(fetchChatPreview.fulfilled, (state, { payload }) => {
			if (
				state.userChats.length > 0 &&
				!state.userChats.map((x) => x.id).includes(payload.id)
			) {
				state.userChats = [...state.userChats, payload];
				state.sidebarLoading = false;
			}
		});
		builder.addCase(fetchChatPreview.rejected, (state) => {
			state.sidebarLoading = false;
		});
		builder.addCase(fetchChatPreview.pending, (state) => {
			state.sidebarLoading = true;
		});
	},
});

export const {
	changeActiveUser,
	changeUserChat,
	changeChatMessages,
	changeChat,
	changeIsOpenChat,
	setConnection,
	changeIsAddUserPopup,
	changeIsSelectEncryption,
	changeUserWhichCreateChat,
	addNotificationMessage,
	removeNotificationMessage,
	changeLastMessage,
	addPinned,
	removePinned,
	addUserChats,
	addUnReadMessageCount,
	removeUnReadMessageCount,
	reset,
	openChats,
} = chatsSlice.actions;

export const selectChatsUserState = (state) => state.chats.activeUserChat;

export const selectUserChats = (state) => state.chats.userChats;

export const selectChat = (state) => state.chats.chat;

export const selectIsAddUserPopup = (state) => state.chats.isAddUserPopup;

export const selectNotificationMessages = (state) => state.chats.notificationMessages;

export const selectUserWhichCreateChat = (state) => state.chats.userWhichCreateChat;

export const selectIsSelectEncryption = (state) => state.chats.isSelectEncryption;

export const selectChatLoading = (state) => state.chats.loading;

export const selectPinned = (state) => state.chats.pinned;

export const selectChatsLoading = (state) => state.chats.sidebarLoading;

export const selectIsOpenChat = (state) => state.chats.isOpenChat;

export const selectHubConnection = (state) => state?.chats?.hub.hubConnection;

export const selectHubConnectionState = (state) => state?.chats?.hub.connected;

export const selectShowReadMessage = (state) => state?.chats?.showReadMessage;

export default chatsSlice.reducer;
