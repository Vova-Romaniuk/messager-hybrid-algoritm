import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteAllMessages, changeIsOpenChat } from '../../features/chats/chats.slice';

export default function PopupChatAction({ chatId, className = '' }) {
	const dispatch = useDispatch();
	const styleItem = 'hover:bg-gray-300 cursor-pointer p-1';
	const clearChat = () => {
		dispatch(deleteAllMessages(chatId));
	};
	const deleteChat = () => {
		dispatch(changeIsOpenChat());
	};
	return (
		<div
			className={`absolute flex flex-col w-32 text-base p-1 h-fit border shadow-md bg-white -left-5 top-11 rounded-lg overflow-hidden ${className}`}
		>
			<div className={styleItem} onClick={() => clearChat()}>
				<span>Очистити чат</span>
			</div>
			<div className={styleItem} onClick={() => deleteChat()}>
				<span>Видалити чат</span>
			</div>
		</div>
	);
}
