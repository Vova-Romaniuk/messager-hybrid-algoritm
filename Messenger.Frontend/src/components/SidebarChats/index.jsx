import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import SearchField from '../../UI/fields/SearchField';
import { fetchUserChats } from '../../features/chats/chats.api';
import { selectChatsLoading, selectUserChats } from '../../features/chats/chats.slice';
import Loader from '../Loader';
import Scroller from '../Scroller';
import UserChat from '../UserChat';
import Users from '../Users';

export default function SidebarChats() {
	const dispatch = useDispatch();
	const container = 'w-11/12 mx-auto';
	const [hiddenPinnedMessage, setHiddenPinnedMessage] = useState(true);
	const userChats = useSelector(selectUserChats);
	const loading = useSelector(selectChatsLoading);
	const [chatsState, setChatsState] = useState(userChats);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchUserChats());
	}, []);

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

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div className='w-80 h-screen flex flex-col border-r-2 border-gray'>
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
					<Loader isLoading={loading}>
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
							chatsState &&
							chatsState
								.filter((item) => item.isPinned)
								.map((element) => <UserChat room={element} key={element.id} />)}
						<div className={`${container}`}>
							<p className='text-base text-[#8D8B91] mt-3'>
								<i className='fa-solid fa-messages'></i> Всі чати
							</p>
						</div>
						{chatsState &&
							chatsState
								.filter((item) => !item.isPinned)
								.map((element) => <UserChat room={element} key={element.id} />)}
					</Loader>
				</Scroller>
			</div>
			{open && (
				<Modal
					handleClose={() => setOpen(false)}
					className='min-w-[600px] max-w-[800px] h-fit'
				>
					<Users />
				</Modal>
			)}
		</div>
	);
}
