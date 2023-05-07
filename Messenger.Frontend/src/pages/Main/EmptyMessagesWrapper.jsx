import React from 'react';

import EmptyWrapperSvg from './EmptyWrapperSvg';

const EmptyMessagesWrapper = () => {
	return (
		<div className='w-full h-full grid place-items-center'>
			<div className=''>
				<h1 className='text-3xl font-bold text-center text-black/70 mb-8'>
					Виберіть чат, та почніть спілкування!
				</h1>
				<div className='w-1/2 h-96'>
					<EmptyWrapperSvg />
				</div>
			</div>
		</div>
	);
};

export default EmptyMessagesWrapper;
