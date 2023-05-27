import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import IconButton from '../../UI/IconButton';
import PopupChatAction from '../../components/PopupChatAction';
import { changeIsOpenChat, selectChat } from '../../features/chats/chats.slice';

const ChatHeader = ({ infoOpen }) => {
	const chat = useSelector(selectChat);
	const [isOpen, setIsOpen] = useState(false);
	const media = useMediaQuery({ maxWidth: ' 450px' });
	const dispatch = useDispatch();

	useEffect(() => {
		setIsOpen(false);
	}, [chat]);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleCloseChat = () => {
		dispatch(changeIsOpenChat());
	};

	return (
		<div className='w-full border-b-2 h-24'>
			<div className='w-11/12 mx-auto flex items-center justify-between h-full'>
				{media && (
					<Button
						onClick={handleCloseChat}
						className='bg-transparent border-0 text-lg text-black mr-4'
					>
						<i className='fa-solid fa-angle-left mr-1 font-bold text-2xl'></i>
					</Button>
				)}
				<div className='flex max-sm:w-7/12'>
					<div className='mr-5'>
						<Avatar className='h-16 w-16' src={chat?.image} />
					</div>
					<div className='flex flex-col justify-between max-sm:w-6/12'>
						<h2 className='text-2xl font-bold max-sm:text-xl max-sm:truncate '>
							{chat?.recipient?.fullName || chat?.recipient?.userName}
						</h2>
						<p className='font-light text-lg max-sm:truncate'>
							{chat?.recipient?.email}
						</p>
					</div>
				</div>
				<div className='w-fit h-fit relative'>
					<IconButton icon='fa-regular fa-ellipsis' onClick={handleClick} />

					{isOpen && <PopupChatAction chatData={chat} onClick={handleClick} />}

					{isOpen && <PopupChatAction chatData={chat} onClick={handleClick} />}

					<IconButton icon='fa-light fa-circle-info' onClick={infoOpen} />
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
