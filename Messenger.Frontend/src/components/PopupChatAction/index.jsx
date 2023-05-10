import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteAllMessages } from '../../features/chats/chats.slice';

export default function PopupChatAction({ chatId }) {
	const dispatch = useDispatch();
	const styleItem = 'hover:bg-gray-300 cursor-pointer p-2';
	return (
		<div className='absolute flex flex-col w-32 text-base h-fit border shadow-md bg-white -left-5 top-11 rounded-lg overflow-hidden'>
			<div className={styleItem} onClick={() => dispatch(deleteAllMessages(chatId))}>
				<span>Очистити чат</span>
			</div>
			<div className={styleItem}>
				<span>Видалити чат</span>
			</div>
		</div>
	);
}
