import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Message from '../../components/Message';
import Sender from '../../components/Sender';
import { selectChat } from '../../features/chats/chats.slice';

// Container with messages
const ChatContainer = () => {
	const userChat = useSelector(selectChat);
	const scrollDown = useRef(null);
	useEffect(() => {
		handleScroll();
	}, [userChat.messages]);

	const handleScroll = () => {
		scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<div className='h-[calc(100vh-6rem)] bg-[#F8F8FA] flex flex-col'>
			<div className='w-11/12 mx-auto h-full flex flex-col overflow-y-auto scroll-none'>
				{userChat.messages?.map((element) => (
					<Message
						userId={element.userId}
						id={element.id}
						content={element.content}
						date={element.date}
						key={element.userId}
					/>
				))}
				<div ref={scrollDown}></div>
			</div>
			<div className='w-full h-32 bg-white flex border-t-2'>
				<Sender />
			</div>
		</div>
	);
};

export default ChatContainer;
