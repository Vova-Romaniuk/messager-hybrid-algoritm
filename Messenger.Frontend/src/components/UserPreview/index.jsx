/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../UI/Avatar';
import SpinnerButton from '../../UI/SpinnerButton';
import {
	changeIsAddUserPopup,
	changeIsSelectEncryption,
	changeUserWhichCreateChat,
	selectIsSelectEncryption,
} from '../../features/chats/chats.slice';
import TypeEncryptions from '../TypeEncryptions';

const UserPreview = ({ user }) => {
	const navigate = useNavigate();
	const isSelectEncryption = useSelector(selectIsSelectEncryption);
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
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
