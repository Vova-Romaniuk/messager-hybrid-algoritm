import React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../UI/Avatar';
import SpinnerButton from '../../UI/SpinnerButton';
import { ChatService } from '../../services/ChatService';

const UserPreview = ({ user }) => {
	const navigate = useNavigate();
	const { id, userName, email, image } = user;

	const handleStartMessaging = async () => {
		const chatId = await ChatService.create(id);

		navigate(`/${chatId}`);
	};

	return (
		<div className='border-t last:border-b flex p-4 justify-between'>
			<div className='flex items-center'>
				<Avatar src={image} className='mr-4' />
				<div>
					<h1 className='font-bold text-xl'>{userName}</h1>
					<h2>{email}</h2>
				</div>
			</div>
			<SpinnerButton onClick={handleStartMessaging}>
				Написати <i className='ml-2 fas fa-envelope'></i>
			</SpinnerButton>
		</div>
	);
};

export default UserPreview;
