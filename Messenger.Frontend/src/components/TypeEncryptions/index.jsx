import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../UI/Button';
import {
	selectUserWhichCreateChat,
	changeIsSelectEncryption,
} from '../../features/chats/chats.slice';
import { ChatService } from '../../services/ChatService';
import { HYBRID_ENCRYPTION_ALGORITHMS } from '../../utils/constants';

export default function TypeEncryptions() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [typeEncryption, setTypeEncryption] = useState('');
	const handleClick = (value) => {
		setTypeEncryption(value);
		handleStartMessaging();
	};
	const { id } = useSelector(selectUserWhichCreateChat);
	const handleStartMessaging = async () => {
		const chatId = await ChatService.create(id);

		navigate(`/${chatId}`);
	};
	return (
		<div className='w-full h-full flex flex-col p-10'>
			<h3 className='text-center text-3xl'>Виберіть тип шифрування</h3>
			<div className='w-full h-5/6 grid grid-cols-3 gap-7 my-4'>
				{HYBRID_ENCRYPTION_ALGORITHMS.map((item) => (
					<div
						className={
							typeEncryption === item.name
								? 'h-full w-full rounded-2xl border bg-primary text-white grid cursor-pointer place-items-center'
								: 'h-full w-full rounded-2xl border hover:bg-primary hover:text-white grid cursor-pointer place-items-center'
						}
						onClick={() => handleClick(item.name)}
						key={item.id}
					>
						<span className='text-center text-4xl w-full'>{item.name}</span>
					</div>
				))}
			</div>
			<Button
				disabled={typeEncryption === '' && true}
				className='w-7/12 mx-auto disabled:cursor-not-allowed border-2 border-[#989191] hover:bg-primary text-black'
				onClick={() => dispatch(changeIsSelectEncryption())}
			>
				Створити листування
			</Button>
		</div>
	);
}
