import React from 'react';
import { useSelector } from 'react-redux';

import { selectChat } from '../../features/chats/chats.slice';
import ChatContainerMedia from './ChatContainerMedia';
import HeaderChatMedia from './HeaderChatMedia';

export default function ChatRoomMedia() {
	const chatData = useSelector(selectChat);
	return (
		<div className='w-full h-screen flex flex-col'>
			<HeaderChatMedia chatData={chatData} />
			<ChatContainerMedia />
		</div>
	);
}
