import React from 'react';

import { formatDateTimeToday } from '../../utils/date';

export default function Message({ userId, id, content, when }) {
	return userId === id ? (
		<div className='w-fit h-fit max-w-[80%] mr-0 ml-auto flex flex-col'>
			<span className='ml-auto mr-0 text-[#8D8B91] my-3 '>{formatDateTimeToday(when)}</span>
			<span className='bg-primary break-all whitespace-pre-line text-white rounded-2xl rounded-tr-none p-3 break-words '>
				{content}
			</span>
		</div>
	) : (
		<div className='max-w-[80%] h-fit w-fit my-3 mr-auto ml-0 flex flex-col'>
			<span className='mr-auto ml-0 text-[#8D8B91] my-3 '>{formatDateTimeToday(when)}</span>
			<span className='bg-white break-all whitespace-pre-line rounded-2xl rounded-tl-none p-3 border break-words'>
				{content}
			</span>
		</div>
	);
}
