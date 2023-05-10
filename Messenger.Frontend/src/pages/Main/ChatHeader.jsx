import React, { useState } from 'react';

import Avatar from '../../UI/Avatar';
import IconButton from '../../UI/IconButton';
import PopupChatAction from '../../components/PopupChatAction';

const ChatHeader = ({ infoOpen, chatData }) => {
	const tempText = '2 онлайн';
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className='w-full border-b-2 h-24'>
			<div className='w-11/12 mx-auto flex items-center justify-between h-full'>
				<div className='flex'>
					<div className='mr-5'>
						<Avatar img={chatData.icon} className='h-16 w-16' />
					</div>
					<div className='flex flex-col justify-between'>
						<h2 className='text-2xl font-bold'>{chatData.userName}</h2>
						<p className='font-light text-lg'>{tempText}</p>
					</div>
				</div>
				<div className='w-fit h-fit relative'>
					<IconButton icon='fa-regular fa-ellipsis' onClick={handleClick} />
					{isOpen && <PopupChatAction chatId={chatData.id} />}
					<IconButton icon='fa-light fa-circle-info' onClick={infoOpen} />
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
