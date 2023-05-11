import * as signalR from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr';

import { Token } from './domain/token';

// eslint-disable-next-line no-undef
const url = process.env.REACT_APP_CHAT_HUB_URL;

export class HubService {
	#hubConnection;

	configure() {
		this.#hubConnection = new signalR.HubConnectionBuilder()
			.withUrl(url, {
				accessTokenFactory: () => Token.get(),
			})
			.configureLogging(LogLevel.Information)
			.build();
	}

	async startConnection() {
		this.#hubConnection.on('JoinToRoom', (res) => {
			console.log('Join', res);
		});

		this.#hubConnection.on('ReceiveMessage', (message) => {
			if (window.location.href.includes(message.roomId)) {
			}
		});

		this.#hubConnection.on('UsersInRoom', (data) => {
			console.log(data);
		});

		this.#hubConnection.on('UserTyping', (data) => {
			console.log(data);
		});

		this.#hubConnection.on('UserStopTyping', () => {
			console.log('');
		});

		await this.#hubConnection.start();
		return this.#hubConnection;
	}

	async disconnect() {
		await this.#hubConnection.stop();
	}
}
