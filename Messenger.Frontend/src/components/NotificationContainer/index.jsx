import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectNotificationMessages } from '../../features/chats/chats.slice';
import NotificationMessage from '../NotificationMessage';

export default function NotificationContainer() {
	const scrollDown = useRef(null);
	const notificationMessages = useSelector(selectNotificationMessages);

	useEffect(() => {
		scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
	}, [notificationMessages]);

	return (
		notificationMessages.length > 0 && (
			<div className='absolute w-60 h-fit z-50 right-10 flex flex-col overflow-y-auto scroll-none p-2 pt-8'>
				{notificationMessages?.map((element) => (
					<NotificationMessage
						content={element.content}
						userName={element.userName}
						key={element.id}
					/>
				))}
				<div ref={scrollDown}></div>
			</div>
		)
	);
}
