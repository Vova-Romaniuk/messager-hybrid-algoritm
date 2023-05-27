import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import { selectChat } from '../../features/chats/chats.slice';

const ChatInfoSidebar = ({ onClick }) => {
	const { recipient } = useSelector(selectChat);
	const media = useMediaQuery({ maxWidth: ' 450px' });
	const textContainer = 'my-4 flex flex-col px-3';
	const styleTitle = 'text-black-500';
	const styleInfo = 'text-black';
	return (
		<div className='w-[500px] sm:w-full border-l-2 h-screen flex flex-col text-lg'>
			{media && <Button onClick={onClick}>Закрити</Button>}
			<div className='mx-auto mt-6'>
				<Avatar className='w-32 h-32' src={recipient?.image} />
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Email:</span>
				<span className={styleInfo}>{recipient?.email}</span>
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Ім`я користувача:</span>
				<span className={styleInfo}>{recipient?.userName}</span>
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Повне ім`я:</span>
				<span className={styleInfo}>
					{recipient?.fullName || 'Користувач немає повного імені'}
				</span>
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Про себе:</span>
				<span className={styleInfo}>{recipient?.description}</span>
			</div>
		</div>
	);
};

export default ChatInfoSidebar;
