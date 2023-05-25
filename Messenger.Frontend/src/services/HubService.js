import * as signalR from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr';

import { store } from '../app/store';
import { changeChatMessages } from '../features/chats/chats.slice';
import { Token } from './domain/token';

export const signalRConnection = async () => {
	const connection = new signalR.HubConnectionBuilder()
		// eslint-disable-next-line no-undef
		.withUrl(process.env.REACT_APP_CHAT_HUB_URL, {
			accessTokenFactory: () => Token.get(),
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
			// store.dispatch(addMessageNotification(message));
			// setTimeout(() => {
			// 	store.dispatch(removeMessageNotification(message.id));
			// }, 5000);
		}
		//store.dispatch(changeLastMessage(message));
	});

	connection.on('UsersInRoom', (data) => {
		console.log(data);
	});

	connection.on('UserTyping', () => {
		//store.dispatch(handleTyping(data));
	});

	connection.on('UserStopTyping', () => {
		//store.dispatch(restoreHandleTyping());
	});
};

export const connectGatekeeper = (connection) => {
	return (
		connection.state === signalR.HubConnectionState.Connecting ||
		connection.state === signalR.HubConnectionState.Connected
	);
};
