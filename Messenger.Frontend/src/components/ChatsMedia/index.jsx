import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SearchField from '../../UI/fields/SearchField';
import { selectUserChats } from '../../features/chats/chats.slice';
import Scroller from '../Scroller';
import UserChat from '../UserChat';

export default function ChatsMedia() {
	const container = 'w-11/12 mx-auto';
	const [hiddenPinnedMessage, setHiddenPinnedMessage] = useState(true);
	const userChats = useSelector(selectUserChats);
	const [chatsState, setChatsState] = useState(userChats);
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
		<div className='w-full h-[calc(100%-4rem)] flex flex-col border-gray'>
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
							.map((element, index) => <UserChat room={element} key={index} />)}
					<div className={`${container}`}>
						<p className='text-base text-[#8D8B91] mt-3'>
							<i className='fa-solid fa-messages'></i> Всі чати
						</p>
					</div>
					{chatsState
						.filter((item) => !item.isPinned)
						.map((element, index) => (
							<UserChat room={element} key={index} />
						))}
				</Scroller>
			</div>
		</div>
	);
}
