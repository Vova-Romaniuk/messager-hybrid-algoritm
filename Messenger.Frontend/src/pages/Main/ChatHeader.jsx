import React from 'react';
import { useSelector } from 'react-redux';

import Avatar from '../../UI/Avatar';
import IconButton from '../../UI/IconButton';
import { selectChat } from '../../features/chats/chats.slice';

const ChatHeader = ({ infoOpen }) => {
	const chat = useSelector(selectChat);

	return (
		<div className='w-full border-b-2 h-24'>
			<div className='w-11/12 mx-auto flex items-center justify-between h-full'>
				<div className='flex'>
					<div className='mr-5'>
						<Avatar className='h-16 w-16' src={chat?.image} />
					</div>
					<div className='flex flex-col justify-between'>
						<h2 className='text-2xl font-bold'>
							{chat?.recipient?.fullName || chat?.recipient?.userName}
						</h2>
						<p className='font-light text-lg'>{chat?.recipient?.email}</p>
					</div>
				</div>
				<div className=''>
					<IconButton icon='fa-regular fa-ellipsis' />
					<IconButton icon='fa-light fa-circle-info' onClick={infoOpen} />
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
