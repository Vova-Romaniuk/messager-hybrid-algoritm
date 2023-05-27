import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import SearchField from '../../UI/fields/SearchField';
import {
	selectUserChats,
	changeIsAddUserPopup,
	selectIsAddUserPopup,
	changeIsSelectEncryption,
	selectIsSelectEncryption,
} from '../../features/chats/chats.slice';
import Scroller from '../Scroller';
import TypeEncryptions from '../TypeEncryptions';
import UserChat from '../UserChat';
import Users from '../Users';

export default function ChatsMedia() {
	const container = 'w-11/12 mx-auto';
	const dispatch = useDispatch();
	const [hiddenPinnedMessage, setHiddenPinnedMessage] = useState(true);
	const userChats = useSelector(selectUserChats);
	const isSelectEncryption = useSelector(selectIsSelectEncryption);
	const [chatsState, setChatsState] = useState(userChats);
	const isAddUserPopup = useSelector(selectIsAddUserPopup);
	useEffect(() => {
		setChatsState(userChats);
	}, [userChats]);

	const handleOpen = () => {
		dispatch(changeIsAddUserPopup());
	};

	const handleChange = (value) => {
		if (value.trim() === '') {
			setChatsState([...userChats]);
			return;
		}
		setChatsState(chatsState?.filter((element) => element?.userName?.includes(value)));
	};
	return (
		<div className='w-full h-[calc(100%-4rem)] flex flex-col border-gray'>
			<div className={`${container} h-fit`}>
				<h4 className='text-2xl font-bold text-left mt-3'>Повідомлення</h4>
				<div className='w-full h-12 rounded-xl flex bg-[#F8F8FA] text-[#C1C0C4] mt-5 text-base items-center border'>
					<i className='fa-sharp fa-solid fa-magnifying-glass mr-2 ml-3'></i>
					<SearchField
						placeholder='Пошук'
						className='bg-transparent w-11/12 h-full my-0 border-none outline-none'
						onChange={handleChange}
					/>
				</div>
				<Button onClick={handleOpen} className='bg-primary text-white w-full mt-3'>
					Почати листування
				</Button>
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
							?.filter((item) => item.isPinned)
							.map((element, index) => <UserChat room={element} key={index} />)}
					<div className={`${container}`}>
						<p className='text-base text-[#8D8B91] mt-3'>
							<i className='fa-solid fa-messages'></i> Всі чати
						</p>
					</div>
					{chatsState
						?.filter((item) => !item.isPinned)
						.map((element, index) => (
							<UserChat room={element} key={index} />
						))}
				</Scroller>
			</div>
			{isAddUserPopup && (
				<Modal
					handleClose={() => dispatch(changeIsAddUserPopup())}
					className='max-sm:w-11/12 h-fit'
				>
					<Users />
				</Modal>
			)}
			{isSelectEncryption && (
				<Modal
					handleClose={() => dispatch(changeIsSelectEncryption())}
					className='max-sm:w-11/12 max-sm:h-4/6'
				>
					<TypeEncryptions />
				</Modal>
			)}
		</div>
	);
}
