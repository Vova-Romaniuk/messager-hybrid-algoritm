import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import SearchField from '../../UI/fields/SearchField';
import {
	selectChatsLoading,
	selectUserChats,
	changeIsAddUserPopup,
	selectIsAddUserPopup,
	selectIsSelectEncryption,
	changeIsSelectEncryption,
	selectHubConnection,
	selectPinned,
} from '../../features/chats/chats.slice';
import { signalRConnection } from '../../services/HubService';
import Loader from '../Loader';
import Scroller from '../Scroller';
import TypeEncryptions from '../TypeEncryptions';
import UserChat from '../UserChat';
import Users from '../Users';

export default function SidebarChats() {
	const dispatch = useDispatch();
	const container = 'w-11/12 mx-auto';
	const [hiddenPinnedMessage, setHiddenPinnedMessage] = useState(true);
	const userChats = useSelector(selectUserChats);
	const hub = useSelector(selectHubConnection);
	const loading = useSelector(selectChatsLoading);

	const pinned = useSelector(selectPinned);
	const isAddUserPopup = useSelector(selectIsAddUserPopup);
	const isSelectEncryption = useSelector(selectIsSelectEncryption);
	const [chatsState, setChatsState] = useState(userChats);

	useEffect(() => {
		setChatsState(userChats);
		(async () => {
			if (userChats && userChats.length > 0) {
				if (hub === null) {
					const ids = userChats.map((item) => item.id);
					const connection = await signalRConnection();
					connection?.invoke('JoinToUsersRooms', ids);
				}
			}
		})();
	}, [userChats]);

	const handleChange = (value) => {
		if (value.trim() === '') {
			setChatsState([...userChats]);
			return;
		}

		setChatsState(
			userChats.filter((room) => {
				return room?.title.toLowerCase().includes(value.toLowerCase());
			})
		);
	};

	const handleOpen = () => {
		dispatch(changeIsAddUserPopup());
	};

	return (
		<div className='w-[400px] h-full flex flex-col border-r-2 border-gray'>
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
							chatsState
								?.filter((element) => pinned?.includes(element.id))
								?.map((element) => (
									<div className='w-11/12 mx-auto' key={element.id}>
										<UserChat room={element} />
										<hr />
									</div>
								))}
						<div className={`${container}`}>
							<p className='text-base text-[#8D8B91] my-3'>
								<i className='fa-solid fa-messages'></i> Всі чати
							</p>
							<hr />
						</div>
						{chatsState &&
							chatsState
								?.filter((element) => !pinned?.includes(element.id))
								?.map((element) => (
									<div className='w-11/12 mx-auto' key={element.id}>
										<UserChat room={element} />
										<hr />
									</div>
								))}
					</Loader>
				</Scroller>
			</div>
			{isAddUserPopup && (
				<Modal handleClose={() => dispatch(changeIsAddUserPopup())} className='w-fit h-fit'>
					<Users />
				</Modal>
			)}
			{isSelectEncryption && (
				<Modal
					handleClose={() => dispatch(changeIsSelectEncryption())}
					className='w-8/12 h-3/6'
				>
					<TypeEncryptions />
				</Modal>
			)}
		</div>
	);
}
