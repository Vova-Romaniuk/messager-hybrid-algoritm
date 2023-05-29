import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Avatar from '../../UI/Avatar';
import {
	changeChat,
	changeIsOpenChat,
	addPinned,
	removePinned,
	selectPinned,
} from '../../features/chats/chats.slice';
import { selectUserId } from '../../features/user/user.slice';
import { PinnedService } from '../../services/PinnedService';
import { formatDateTimeToday } from '../../utils/date';

export default function UserChat({ room }) {
	const [isHovering, setIsHovering] = useState(false);
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const pinned = useSelector(selectPinned);
	const styleUserChat = 'h-24 my-1 flex mx-auto hover:cursor-pointer px-1';
	const iconPinnedStyle =
		'absolute top-1 -right-1 text-white z-50 text-base p-1 rounded-full w-8 h-8 bg-primary';

	const handleMouseOver = () => {
		setIsHovering(true);
	};
	const handleMouseOut = () => {
		setIsHovering(false);
	};
	const clickContainer = () => {
		dispatch(changeChat(room));
		dispatch(changeIsOpenChat());
	};
	const handleAdd = (event) => {
		event.preventDefault();
		PinnedService.add(room.id);
		dispatch(addPinned(room.id));
	};
	const handleRemove = (event) => {
		event.preventDefault();
		PinnedService.remove(room.id);
		dispatch(removePinned(room.id));
	};

	return (
		<NavLink
			to={`/${room.id}`}
			className={({ isActive }) => {
				return isActive
					? `${styleUserChat} bg-primary/30 rounded-xl flex`
					: `${styleUserChat} hover:bg-primary/30 min-sm:hover:rounded-xl flex`;
			}}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onClick={clickContainer}
		>
			<div className='w-full h-full p-2 relative flex'>
				<div className='w-12 mr-1 h-fit my-auto'>
					<Avatar className='w-12 h-12 shadow-none' src={room?.image} />
				</div>
				<div className='w-[calc(100%-3rem)] flex flex-col'>
					<div className='mt-3 grid grid-cols-3 justify-between w-full'>
						<span className='font-bold text-ellipsis overflow-hidden col-span-2'>
							{room?.recipient.userName}
						</span>
						<span className='text-sm text-[#8D8B91] text-right'>
							{room?.message && formatDateTimeToday(room?.message?.when)}
						</span>
					</div>
					<div className='mt-2 flex justify-between'>
						<span className='text-black/80 text-ellipsis overflow-hidden text-sm'>
							{userId === room?.message?.user?.id
								? 'Ви'
								: room?.message?.user?.userName}
							: {room?.message?.text}
						</span>
						{room.notSeenCount !== 0 && (
							<div className='ml-5 w-5 h-5 bg-[#ED4A4D] flex text-white rounded-full'>
								<span className='m-auto text-sm'>{room.notSeenCount}</span>
							</div>
						)}
					</div>
				</div>
				{isHovering && pinned?.includes(room.id) && (
					<button className={iconPinnedStyle} onClick={handleRemove}>
						<i className='fa-solid fa-bookmark-slash'></i>
					</button>
				)}
				{isHovering && !pinned?.includes(room.id) && (
					<button className={iconPinnedStyle} onClick={handleAdd}>
						<i className='fa-solid fa-bookmark'></i>
					</button>
				)}
			</div>
		</NavLink>
	);
}
