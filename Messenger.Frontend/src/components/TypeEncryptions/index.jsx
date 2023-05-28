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
import Scroller from '../Scroller';

export default function TypeEncryptions() {
	const navigate = useNavigate();
	const [typeEncryption, setTypeEncryption] = useState();
	const { id } = useSelector(selectUserWhichCreateChat);
	const dispatch = useDispatch();

	const handleClick = () => {
		handleStartMessaging();
		dispatch(changeIsSelectEncryption());
	};

	const handleStartMessaging = async () => {
		const chatId = await ChatService.create(id, typeEncryption);

		navigate(`/${chatId}`);
	};

	return (
		<div className='w-full h-full flex flex-col p-10'>
			<h3 className='text-center text-3xl max-sm:mb-2'>Виберіть тип шифрування</h3>
			<div className='max-sm:h-[70%] max-sm:w-full'>
				<Scroller>
					<div className='w-full h-5/6 grid grid-cols-3 max-sm:flex max-sm:flex-col max-sm:grid-cols-none gap-7 my-4 p-4'>
						{HYBRID_ENCRYPTION_ALGORITHMS.map((item) => (
							<div
								className={
									typeEncryption === item.name
										? 'h-fit p-4 w-full rounded-2xl border bg-primary text-white grid cursor-pointer place-items-center'
										: 'h-fit p-4 w-full rounded-2xl border hover:bg-primary hover:text-white grid cursor-pointer place-items-center'
								}
								onClick={() => setTypeEncryption(item.id)}
								key={item.id}
							>
								<span className='text-center text-2xl w-full'>{item.name}</span>
							</div>
						))}
					</div>
				</Scroller>
			</div>
			<Button
				disabled={typeEncryption === ''}
				className='w-7/12 mx-auto disabled:cursor-not-allowed border-2 border-[#989191] enabled:hover:bg-primary text-black max-sm:mt-3'
				onClick={() => handleClick()}
			>
				Створити листування
			</Button>
		</div>
	);
}
