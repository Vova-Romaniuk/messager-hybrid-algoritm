import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Message from '../../components/Message';
import Sender from '../../components/Sender';
import { selectChat } from '../../features/chats/chats.slice';
import { selectUserId } from '../../features/user/user.slice';

const ChatContainer = ({ send }) => {
	const chat = useSelector(selectChat);
	const userId = useSelector(selectUserId);
	const scrollDown = useRef(null);

	useEffect(() => {
		handleScroll();
	}, [chat.messages]);

	const handleScroll = () => {
		scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='h-[calc(100vh-6rem)] bg-[#F8F8FA] flex flex-col'>
			<div className='w-11/12 mx-auto h-full flex flex-col overflow-y-auto scroll-none'>
				{chat?.messages?.length > 0 ? (
					chat?.messages?.map((message) => (
						<Message
							userId={userId}
							id={message?.user?.id}
							content={message.text}
							when={message.when}
							key={message.userId}
						/>
					))
				) : (
					<div className='h-full grid place-items-center'>
						<h1>У вас поки немає повідомлень!</h1>
					</div>
				)}
				<div ref={scrollDown}></div>
			</div>
			<div className='w-full h-24 bg-white flex border-t-2'>
				<Sender send={send} />
			</div>
		</div>
	);
};

export default ChatContainer;
