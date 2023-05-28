import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	selectHubConnection,
	selectHubConnectionState,
	selectUserChats,
	setConnection,
} from '../../features/chats/chats.slice';
import { connectGatekeeper, signalRConnection } from '../../services/HubService';

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
