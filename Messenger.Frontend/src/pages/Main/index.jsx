/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import { fetchChat } from '../../features/chats/chats.api';
import {
	selectChatLoading,
	selectChat,
	selectHubConnection,
	removeUnReadMessageCount,
} from '../../features/chats/chats.slice';
import { selectUserId } from '../../features/user/user.slice';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInfoSidebar from './ChatInfoSidebar';

const Main = () => {
	const dispatch = useDispatch();
	const loading = useSelector(selectChatLoading);
	const hubConnection = useSelector(selectHubConnection);
	const chat = useSelector(selectChat);
	const media = useMediaQuery({ maxWidth: ' 450px' });
	const userId = useSelector(selectUserId);

	const { id } = useParams();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (id) {
			dispatch(fetchChat(id)).then(() => {
				dispatch(removeUnReadMessageCount(id));
			});
		}
	}, [id]);

	const sendMessage = (message) => {
		const trimmedMessage = message.trim();
		if (trimmedMessage === '') {
			return;
		}
		hubConnection?.invoke('SendMessage', id, message, chat?.typeEncryption);
	};

	const toggleSidebar = () => {
		setOpen(!open);
	};

	return (
		<Loader isLoading={loading}>
			<div className='flex w-full'>
				{!media ? (
					<div className='w-full'>
						<ChatHeader infoOpen={toggleSidebar} />
						<ChatContainer send={sendMessage} />
					</div>
				) : (
					media &&
					!open && (
						<div className='w-full'>
							<ChatHeader infoOpen={toggleSidebar} />
							<ChatContainer send={sendMessage} />
						</div>
					)
				)}
				{open && <ChatInfoSidebar onClick={toggleSidebar} />}
			</div>
		</Loader>
	);
};

export default Main;
