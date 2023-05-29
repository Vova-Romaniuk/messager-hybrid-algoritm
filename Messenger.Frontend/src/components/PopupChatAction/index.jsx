import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { cleanChat, deleteChat } from '../../features/chats/chats.api';
import { selectPinned, addPinned, removePinned } from '../../features/chats/chats.slice';
import { PinnedService } from '../../services/PinnedService';

export default function PopupChatAction({ chatData, onClick, className = '' }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const styleItem = 'hover:bg-gray-300 cursor-pointer p-1';
	const pinned = useSelector(selectPinned);
	const clearChatHandler = () => {
		dispatch(cleanChat(chatData.id));
		onClick();
	};
	const handleAdd = (event) => {
		event?.preventDefault();
		PinnedService.add(chatData.id);
		onClick();
		dispatch(addPinned(chatData.id));
	};
	const handleRemove = (event) => {
		event?.preventDefault();
		onClick();
		PinnedService.remove(chatData.id);
		dispatch(removePinned(chatData.id));
	};
	const deleteChatHandler = () => {
		dispatch(deleteChat(chatData.id)).then(() => {
			navigate('/');
		});
		onClick();
	};

	return (
		<div
			className={`absolute flex flex-col whitespace-nowrap w-fit text-base p-1 h-fit border shadow-md bg-white -left-5 top-11 max-sm:-left-12 rounded-lg overflow-hidden max-sm:text-base ${className}`}
		>
			<div className={styleItem} onClick={() => clearChatHandler()}>
				<span>Очистити чат</span>
			</div>
			<div className={styleItem} onClick={() => deleteChatHandler()}>
				<span>Видалити чат</span>
			</div>
			{pinned.includes(chatData.id) && (
				<div className={styleItem} onClick={() => handleRemove()}>
					<span>Відкріпити чат</span>
				</div>
			)}
			{!pinned.includes(chatData.id) && (
				<div className={styleItem} onClick={() => handleAdd()}>
					<span>Закріпити чат</span>
				</div>
			)}
		</div>
	);
}
