import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import IconButton from '../../UI/IconButton';
import { changeIsOpenChat } from '../../features/chats/chats.slice';
import PopupChatAction from '../PopupChatAction';

export default function HeaderChatMedia({ infoOpen, chatData }) {
	const tempText = '2 онлайн';
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const handleCloseChat = () => {
		dispatch(changeIsOpenChat());
	};
	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className='w-full border-b-2 h-24'>
			<div className='w-11/12 mx-auto flex items-center h-full'>
				<Button
					onClick={handleCloseChat}
					className='bg-transparent border-0 text-lg text-black mr-4'
				>
					<i className='fa-solid fa-angle-left mr-1 font-bold text-2xl'></i>
				</Button>
				<div className='flex'>
					<div className='mr-5'>
						<Avatar img={chatData.icon} className='h-14 w-14' />
					</div>
					<div className='flex flex-col justify-between'>
						<h2 className='text-xl font-bold'>{chatData.userName}</h2>
						<p className='font-light text-lg'>{tempText}</p>
					</div>
				</div>
				<div className='w-fit h-fit relative mr-0 ml-auto'>
					<IconButton icon='fa-regular fa-ellipsis' onClick={handleClick} />
					{isOpen && (
						<PopupChatAction chatId={chatData.id} className='text-xs w-fit p-0' />
					)}
					<IconButton icon='fa-light fa-circle-info' onClick={infoOpen} />
				</div>
			</div>
		</div>
	);
}
