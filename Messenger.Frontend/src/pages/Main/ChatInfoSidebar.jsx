import React from 'react';

import Avatar from '../../UI/Avatar';

const ChatInfoSidebar = () => {
	const textContainer = 'my-4 flex flex-col px-3';
	const styleTitle = 'text-black-500';
	const styleInfo = 'text-white text-stroke';
	return (
		<div className='w-[500px] border-l-2 h-screen flex flex-col text-lg'>
			<div className='mx-auto mt-6'>
				<Avatar className='w-32 h-32' />
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Email:</span>
				<span className={styleInfo}>romanyuck1504@gmail.com</span>
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Ім`я користувача:</span>
				<span className={styleInfo}>the__rmk</span>
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Повне ім`я:</span>
				<span className={styleInfo}>Романюк Володимир</span>
			</div>
			<div className={textContainer}>
				<span className={styleTitle}>Про себе:</span>
				<span className={styleInfo}>Класний чувачок</span>
			</div>
		</div>
	);
};

export default ChatInfoSidebar;
