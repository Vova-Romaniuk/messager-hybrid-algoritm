import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectNotificationMessages } from '../../features/chats/chats.slice';
import NotificationMessage from '../NotificationMessage';

const NotificationContainer = () => {
	const scrollDown = useRef(null);
	const notificationMessages = useSelector(selectNotificationMessages);

	useEffect(() => {
		scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
	}, [notificationMessages]);

	return (
		notificationMessages.length > 0 && (
			<div className='absolute w-80 h-fit z-50 max-sm:h-32 max-sm:right-0 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 right-6 flex flex-col overflow-y-auto scroll-none p-2 pt-8 pb-3'>
				{notificationMessages?.map((element) => (
					<NotificationMessage
						roomId={element.roomId}
						text={element.text}
						userName={element.user.userName}
						key={element.id}
						image={element.user.image}
					/>
				))}
				<div ref={scrollDown}></div>
			</div>
		)
	);
};

export default NotificationContainer;
