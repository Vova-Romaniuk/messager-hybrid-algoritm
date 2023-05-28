import React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../UI/Avatar';

export default function NotificationMessage({ roomId, image, text, userName }) {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`/${roomId}`)}
			className='flex w-full h-18 bg-white shadow-md rounded-2xl p-2 mt-2'
		>
			<Avatar className='w-10 h-10 mx-0' src={image} />
			<div className='ml-3 text w-9/12 text-sm overflow-hidden'>
				<div className='flex justify-between'>
					<p className='font-medium truncate'>{userName}</p>
					<span className='text-[#969595] text-right'>зараз</span>
				</div>
				<p className='truncate'>{text}</p>
			</div>
		</div>
	);
}
