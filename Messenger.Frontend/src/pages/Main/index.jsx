import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectChat } from '../../features/chats/chats.slice';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInfoSidebar from './ChatInfoSidebar';

const Main = () => {
	const [open, setOpen] = useState(false);
	const [infoChat, setInfoChat] = useState({});
	const chatData = useSelector(selectChat);

	useEffect(() => {
		setInfoChat(chatData);
	}, [chatData]);
	const toggleSidebar = () => {
		setOpen(!open);
	};

	return (
		<div className='w-full flex'>
			<div className='w-full'>
				<ChatHeader infoOpen={toggleSidebar} chatData={infoChat} />
				<ChatContainer />
			</div>
			{open && <ChatInfoSidebar />}
		</div>
	);
};

export default Main;
