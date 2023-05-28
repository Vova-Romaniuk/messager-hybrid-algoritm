import React from 'react';
import { useDispatch } from 'react-redux';

import Avatar from '../../UI/Avatar';
import SpinnerButton from '../../UI/SpinnerButton';
import {
	changeIsAddUserPopup,
	changeIsSelectEncryption,
	changeUserWhichCreateChat,
} from '../../features/chats/chats.slice';

const UserPreview = ({ user }) => {
	const dispatch = useDispatch();
	const { userName, email, image } = user;

	const handleClick = () => {
		dispatch(changeIsSelectEncryption());
		dispatch(changeIsAddUserPopup());
		dispatch(changeUserWhichCreateChat(user));
	};

	return (
		<div className='border-t last:border-b flex p-4 justify-between max-sm:flex-col max-sm:w-full'>
			<div className='flex items-center max-sm:w-full'>
				<Avatar src={image} className='mr-4' />
				<div className='max-sm:w-9/12'>
					<h1 className='font-bold text-xl truncate'>{userName}</h1>
					<h2 className='truncate'>{email}</h2>
				</div>
			</div>
			<SpinnerButton className='max-sm:mt-2' onClick={handleClick}>
				Написати <i className='ml-2 fas fa-envelope'></i>
			</SpinnerButton>
		</div>
	);
};

export default UserPreview;
