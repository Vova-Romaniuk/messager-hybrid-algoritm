import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { cleanChat, deleteChat } from '../../features/chats/chats.api';

export default function PopupChatAction({ chatData, onClick, className = '' }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const styleItem = 'hover:bg-gray-300 cursor-pointer p-1';

	const clearChatHandler = () => {
		dispatch(cleanChat(chatData.id));
		onClick();
	};

	const deleteChatHandler = () => {
		dispatch(deleteChat(chatData.id)).then(() => {
			navigate('/');
		});
		onClick();
	};

	return (
		<div
			className={`absolute flex flex-col whitespace-nowrap w-fit text-base p-1 h-fit border shadow-md bg-white -left-5 top-11 rounded-lg overflow-hidden max-sm:text-xs ${className}`}
		>
			<div className={styleItem} onClick={() => clearChatHandler()}>
				<span>Очистити чат</span>
			</div>
			<div className={styleItem} onClick={() => deleteChatHandler()}>
				<span>Видалити чат</span>
			</div>
			{/* <div className={styleItem} onClick={() => pinnedChat()}>
				<span>{chatData?.isPinned ? 'Відкріпити чат' : 'Закріпити чат'}</span>
			</div> */}
		</div>
	);
}
