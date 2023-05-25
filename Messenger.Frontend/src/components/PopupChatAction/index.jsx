import React from 'react';
import { useDispatch } from 'react-redux';

import { pinChat } from '../../features/chats/chats.api';
import { deleteAllMessages, changeIsOpenChat } from '../../features/chats/chats.slice';

export default function PopupChatAction({ chatData, onClick, className = '' }) {
	const dispatch = useDispatch();
	const styleItem = 'hover:bg-gray-300 cursor-pointer p-1';
	const clearChat = () => {
		dispatch(deleteAllMessages(chatData.id));
		onClick();
	};
	const deleteChat = () => {
		dispatch(changeIsOpenChat());
		onClick();
	};
	const pinnedChat = () => {
		dispatch(pinChat(chatData.id));
		onClick();
	};
	return (
		<div
			className={`absolute flex flex-col whitespace-nowrap w-fit text-base p-1 h-fit border shadow-md bg-white -left-5 top-11 rounded-lg overflow-hidden max-sm:text-xs ${className}`}
		>
			<div className={styleItem} onClick={() => clearChat()}>
				<span>Очистити чат</span>
			</div>
			<div className={styleItem} onClick={() => deleteChat()}>
				<span>Видалити чат</span>
			</div>
			{chatData.isPinned ? (
				<div className={styleItem} onClick={() => pinnedChat()}>
					<span>Відкріпити чат</span>
				</div>
			) : (
				<div className={styleItem} onClick={() => pinnedChat()}>
					<span>Закріпити чат</span>
				</div>
			)}
		</div>
	);
}
