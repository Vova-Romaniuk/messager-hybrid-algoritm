import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Avatar from '../../UI/Avatar';
import { pinChat } from '../../features/chats/chats.api';

export default function UserChat({ room }) {
	const [isHovering, setIsHovering] = useState(false);
	const dispatch = useDispatch();
	const styleUserChat =
		'w-11/12 h-20 border-b-[1px] my-1 flex border-gray last:border-b-0 mx-auto hover:cursor-pointer px-2';
	const iconPinnedStyle =
		'absolute top-1 -right-1 text-white z-50 text-base p-1 rounded-full w-8 h-8 bg-primary';

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	const handleClick = (event) => {
		event.preventDefault();
		dispatch(pinChat(room.id));
	};

	return (
		<NavLink
			to={`/${room?.id}`}
			className={({ isActive }) => {
				return isActive
					? `${styleUserChat} bg-primary/30 rounded-xl flex`
					: `${styleUserChat} hover:bg-primary/30 hover:rounded-xl flex`;
			}}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<div className='w-full h-full flex relative'>
				<div className='w-fit h-fit my-auto'>
					<Avatar className='w-12 h-12 shadow-none' />
				</div>
				<div className='w-10/12 flex flex-col ml-3'>
					<div className='mt-3 flex justify-between'>
						<span className='font-bold'>{room?.userName}</span>
						<span className='text-sm text-[#8D8B91]'>03.05.2023</span>
					</div>
					<div className='mt-2 flex justify-between'>
						<span className=''>{room?.lastMessage}</span>
						<div className='w-5 h-5 bg-[#ED4A4D] flex text-white rounded-full'>
							<span className='m-auto text-sm'>1</span>
						</div>
					</div>
				</div>
				{isHovering && room?.isPinned && (
					<button className={iconPinnedStyle} onClick={handleClick}>
						<i className='fa-solid fa-bookmark-slash'></i>
					</button>
				)}
				{isHovering && !room?.isPinned && (
					<button className={iconPinnedStyle} onClick={handleClick}>
						<i className='fa-solid fa-bookmark'></i>
					</button>
				)}
			</div>
		</NavLink>
	);
}
