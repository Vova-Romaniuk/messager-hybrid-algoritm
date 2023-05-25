import React from 'react';

import Avatar from '../../UI/Avatar';

export default function NotificationMessage({ content, userName }) {
	return (
		<div className='flex w-full h-16 bg-white shadow-md rounded-2xl p-2 mt-2'>
			<Avatar className='w-10 h-10 mx-0' />
			<div className='ml-3 text w-9/12 text-sm overflow-hidden'>
				<div className='flex justify-between'>
					<p className='font-medium truncate'>{userName}</p>
					<span className='text-[#969595] text-right'>зараз</span>
				</div>
				<p className='truncate'>{content}</p>
			</div>
		</div>
	);
}
