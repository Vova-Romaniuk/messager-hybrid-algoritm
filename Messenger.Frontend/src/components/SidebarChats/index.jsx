import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Avatar from '../../UI/Avatar';
import SearchField from '../../UI/fields/SearchField';
import { selectUserChats } from '../../features/chats/chats.slice';
import Scroller from '../Scroller';

export default function SidebarChats() {
	const container = 'w-11/12 mx-auto';
	const [hiddenPinnedMessage, setHiddenPinnedMessage] = useState(true);
	const userChats = useSelector(selectUserChats);
	const [chatsState, setChatsState] = useState(userChats);
	const styleUserChat =
		'w-11/12 h-20 border-b-[1px] my-1 flex border-gray last:border-b-0 mx-auto px-2 cursor-pointer';

	useEffect(() => {
		setChatsState(userChats);
	}, [userChats]);

	const handleChange = (value) => {
		if (value.trim() === '') {
			setChatsState([...userChats]);
			return;
		}
		setChatsState(chatsState.filter((element) => element.userName.includes(value)));
	};
	return (
		<div className='w-72 h-screen flex flex-col border-r-2 border-gray'>
			<div className={`${container} h-1/6`}>
				<h4 className='text-2xl font-bold text-left mt-3'>Повідомлення</h4>
				<div className='w-full h-12 rounded-xl flex bg-[#F8F8FA] text-[#C1C0C4] mt-5 text-base items-center border'>
					<i className='fa-sharp fa-solid fa-magnifying-glass mr-2 ml-3'></i>
					<SearchField
						placeholder='Пошук'
						className='bg-transparent w-11/12 h-full my-0 border-none outline-none'
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className='w-full h-5/6 pb-3'>
				<Scroller>
					<div
						className={`${container} cursor-pointer border-b pb-2 flex`}
						onClick={() => setHiddenPinnedMessage(!hiddenPinnedMessage)}
					>
						<p className='text-base text-[#8D8B91] mt-3'>
							<i className='fa-solid fa-bookmark'></i> Закріплені
						</p>
						<span className='text-base text-[#8D8B91] mt-3 mr-2 ml-auto'>
							{hiddenPinnedMessage ? (
								<i className='fa-sharp fa-light fa-angle-up'></i>
							) : (
								<i className='fa-sharp fa-light fa-angle-down'></i>
							)}
						</span>
					</div>
					{hiddenPinnedMessage &&
						chatsState
							.filter((item) => item.isPinned)
							.map((element) => (
								<NavLink
									to={`/${element.id}`}
									className={({ isActive }) => {
										return isActive
											? `${styleUserChat} bg-primary/30 rounded-xl flex`
											: `${styleUserChat} hover:bg-primary/30 hover:rounded-xl flex`;
									}}
									key={element.id}
								>
									<div className='w-full h-full flex' key={element.userName}>
										<div className='w-fit h-fit ml-3 my-auto'>
											<Avatar className='w-12 h-12 shadow-none' />
										</div>
										<div className='w-10/12 flex flex-col ml-3'>
											<div className='mt-3 flex justify-between'>
												<span className='font-bold'>
													{element.userName}
												</span>
												<span className='text-sm text-[#8D8B91]'>
													03.05.2023
												</span>
											</div>
											<div className='mt-2 flex justify-between'>
												<span className=''>{element.lastMessage}</span>
												<div className='w-5 h-5 bg-[#ED4A4D] flex text-white rounded-full'>
													<span className='m-auto text-sm'>1</span>
												</div>
											</div>
										</div>
									</div>
								</NavLink>
							))}
					<div className={`${container}`}>
						<p className='text-base text-[#8D8B91] mt-3'>
							<i className='fa-solid fa-messages'></i> Всі чати
						</p>
					</div>
					{chatsState
						.filter((item) => !item.isPinned)
						.map((element) => (
							<div
								className='w-11/12 h-20 border-b-[1px] my-1 flex border-gray last:border-b-0 mx-auto hover:cursor-pointer hover:bg-primary/30 hover:rounded-xl px-2'
								key={element.id}
							>
								<div className='w-fit h-fit ml-3 my-auto'>
									<Avatar className='w-12 h-12 shadow-none' />
								</div>
								<div className='w-10/12 flex flex-col ml-3'>
									<div className='mt-3 flex justify-between'>
										<span className='font-bold'>{element.userName}</span>
										<span className='text-sm text-[#8D8B91]'>03.05.2023</span>
									</div>
									<div className='mt-2 flex justify-between'>
										<span className=''>{element.lastMessage}</span>
										<div className='w-5 h-5 bg-[#ED4A4D] flex text-white rounded-full'>
											<span className='m-auto text-sm'>1</span>
										</div>
									</div>
								</div>
							</div>
						))}
				</Scroller>
			</div>
		</div>
	);
}
