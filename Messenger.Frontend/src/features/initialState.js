import { PinnedService } from '../services/PinnedService';
import { SIDEBAR_ICONS } from '../utils/constants';

export const initialChatState = {
	id: null,
	icon: null,
	lastMessage: null,
	userName: null,
	messages: [],
	typeEncryption: null,
};

export const initialState = {
	user: {
		data: null,
		loading: false,
		errors: [],
		users: null,
		usersLoading: false,
	},
	chat: {
		activeUserChat: '',
		userChats: null,
		pinned: PinnedService.get() || [],
		chat: initialChatState,
		loading: false,
		isAddUserPopup: false,
		isSelectEncryption: false,
		sidebarLoading: false,
		isOpenChat: false,
		hub: {
			hubConnection: null,
			connected: false,
		},
		showReadMessage: false,
		notificationMessages: [],
		userWhichCreateChat: {},
	},
	sidebar: {
		activeName: SIDEBAR_ICONS[0].name,
	},
};
