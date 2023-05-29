import * as signalR from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr';

import { store } from '../app/store';
import {
	changeChatMessages,
	changeLastMessage,
	addNotificationMessage,
	removeNotificationMessage,
	addUnReadMessageCount,
} from '../features/chats/chats.slice';
import { Token } from './domain/token';

export const signalRConnection = async () => {
	const connection = new signalR.HubConnectionBuilder()
		// eslint-disable-next-line no-undef
		.withUrl(process.env.REACT_APP_CHAT_HUB_URL, {
			accessTokenFactory: () => Token.get(),
			useDefaultPath: false,
		})
		.withAutomaticReconnect()
		.configureLogging(LogLevel.Information)
		.build();

	socketMethods(connection);
	await connection.start();
	return connection;
};

const socketMethods = (connection) => {
	connection.on('JoinToRoom', (res) => {
		console.log('Join', res);
	});

	connection.on('ReceiveMessage', (message) => {
		if (window.location.href.includes(message.roomId)) {
			store.dispatch(changeChatMessages(message));
		} else {
			store.dispatch(addNotificationMessage(message));
			setTimeout(() => {
				store.dispatch(removeNotificationMessage(message.id));
			}, 5000);

			store.dispatch(addUnReadMessageCount(message.roomId));
		}

		store.dispatch(changeLastMessage(message));
	});

	// connection.onreconnected(() => {
	// 	console.log('Reconnecting...');
	// 	const chats = store.getState().chats.userChats;
	// 	if (!chats || chats.length === 0) {
	// 		return;
	// 	}
	// 	console.log(chats);
	// 	connection?.invoke(
	// 		'JoinToUsersRooms',
	// 		chats.map((chat) => chat.id)
	// 	);
	// 	console.log('Reconnected!');
	// });
};

export const connectGatekeeper = (connection) => {
	return (
		connection.state === signalR.HubConnectionState.Connecting ||
		connection.state === signalR.HubConnectionState.Connected
	);
};
