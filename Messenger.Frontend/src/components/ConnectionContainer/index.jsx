import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	selectHubConnection,
	selectUserChats,
	setConnection,
} from '../../features/chats/chats.slice';
import { connectGatekeeper, signalRConnection } from '../../services/HubService';
import { Token } from '../../services/domain/token';

const ConnectionContainer = ({ children }) => {
	const dispatch = useDispatch();
	const connection = useSelector(selectHubConnection);
	const chats = useSelector(selectUserChats);

	const connect = async () => {
		const connection = await signalRConnection();

		dispatch(setConnection(connection));
	};

	useEffect(() => {
		(async () => {
			if (connection && connectGatekeeper(connection)) {
				return;
			}
			if (Token.get() && chats && chats.length > 0) {
				await connect();
			}
		})();
	}, [chats]);

	return children;
};

export default ConnectionContainer;
