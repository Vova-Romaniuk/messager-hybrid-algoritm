import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserChats } from '../../features/chats/chats.api';
import {
	selectHubConnection,
	selectHubConnectionState,
	selectUserChats,
	setConnection,
} from '../../features/chats/chats.slice';
import { connectGatekeeper, signalRConnection } from '../../services/HubService';
import { Token } from '../../services/domain/token';

const ConnectionContainer = ({ children }) => {
	const dispatch = useDispatch();
	const connection = useSelector(selectHubConnection);
	const chats = useSelector(selectUserChats);
	const isConnected = useSelector(selectHubConnectionState);

	const connect = () => {
		if (isConnected) return;

		signalRConnection().then((connection) => {
			dispatch(setConnection({ hubConnection: connection, connected: true }));
		});
	};

	useEffect(() => {
		if (Token.get() && !chats) {
			dispatch(fetchUserChats());
		}
		(async () => {
			if (connection && connectGatekeeper(connection)) {
				return;
			}
			if (chats && chats.length > 0) {
				await connect();
			}
		})();
	}, [chats]);

	return children;
};

export default ConnectionContainer;
