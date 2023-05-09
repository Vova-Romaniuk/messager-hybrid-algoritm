import React from 'react';

export default function Message({ userId, id, content, date }) {
	return userId === id ? (
		<div className='w-fit h-fit max-w-[80%] mr-0 ml-auto flex flex-col'>
			<span className='ml-auto mr-0 text-[#8D8B91] my-3 '>{date}</span>
			<span className='bg-primary text-white rounded-2xl rounded-tr-none p-3'>{content}</span>
		</div>
	) : (
		<div className='max-w-[80%] h-fit w-fi my-3 mr-auto ml-0 flex flex-col'>
			<span className='mr-auto ml-0 text-[#8D8B91] my-3 '>{date}</span>
			<span className='bg-white rounded-2xl rounded-tl-none p-3 border'>{content}</span>
		</div>
	);
}
