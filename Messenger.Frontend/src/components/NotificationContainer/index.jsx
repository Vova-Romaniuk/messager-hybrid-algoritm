/* eslint-disable no-unused-vars */

/* eslint-disable implicit-arrow-linebreak */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	addNotificationMessage,
	removeNotificationMessage,
	selectNotificationMessages,
} from '../../features/chats/chats.slice';
import NotificationMessage from '../NotificationMessage';

export default function NotificationContainer() {
	const dispatch = useDispatch();
	const scrollDown = useRef(null);
	const [count, setCount] = useState(0);
	const notificationMessages = useSelector(selectNotificationMessages);
	// const handleClick = (message) => {
	// 	dispatch(addNotificationMessage(message));
	// 	setTimeout(() => {
	// 		dispatch(removeNotificationMessage(message.id));
	// 	}, 5000);
	// 	setCount(count + 1);
	// };
	useEffect(() => {
		scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
	}, [notificationMessages]);
	return (
		<div className='absolute w-60 h-screen z-50 right-10 flex flex-col overflow-y-auto scroll-none p-2 pt-8'>
			{notificationMessages?.map((element) => (
				<NotificationMessage
					content={element.content}
					userName={element.userName}
					key={element.id}
				/>
			))}
			<div ref={scrollDown}></div>
			<button>Додати</button>
		</div>
	);
}
