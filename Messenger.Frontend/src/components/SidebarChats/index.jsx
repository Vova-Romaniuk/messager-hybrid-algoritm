import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../UI/Avatar';
import TextField from '../../UI/fields/TextField';
import { changeActiveUser, selectChatsUserState } from '../../features/chats/chats.slice';
import { TEST_USER_CHATS } from '../../utils/constants';
import Scroller from '../Scroller';

export default function SidebarChats() {
	const activeUserChat = useSelector(selectChatsUserState);
	const dispatch = useDispatch();
	const container = 'w-11/12 mx-auto';
	const styleUserChat =
		'w-11/12 h-20 border-b-[1px] my-1 flex border-gray last:border-b-0 mx-auto px-2 cursor-pointer';
	return (
		<div className='w-72 h-screen flex flex-col border-r-2 border-gray'>
			<div className={`${container} h-1/6`}>
				<h4 className='text-2xl font-bold text-left mt-3'>Повідомлення</h4>
				<div className='w-full h-12 rounded-xl flex bg-[#F8F8FA] text-[#C1C0C4] mt-5 text-base items-center'>
					<i className='fa-sharp fa-solid fa-magnifying-glass mr-2 ml-3'></i>
					<TextField
						placeholder='Пошук'
						className='bg-transparent w-11/12 h-full my-0 border-none outline-none'
					/>
				</div>
			</div>
			<div className='w-full h-5/6 pb-3'>
				<Scroller>
					<div className={`${container}`}>
						<p className='text-base text-[#8D8B91] mt-3'>
							<i className='fa-solid fa-bookmark'></i> Закріплені
						</p>
					</div>
					{TEST_USER_CHATS.map((element) => (
						<div
							className={
								activeUserChat === element.id
									? `${styleUserChat} bg-primary/30 rounded-xl`
									: `${styleUserChat} hover:bg-primary/30 hover:rounded-xl`
							}
							key={element.userName}
							onClick={() => dispatch(changeActiveUser(element.id))}
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
					<div className={`${container}`}>
						<p className='text-base text-[#8D8B91] mt-3'>
							<i className='fa-solid fa-messages'></i> Всі чати
						</p>
					</div>
					{TEST_USER_CHATS.map((element) => (
						<div
							className='w-11/12 h-20 border-b-[1px] my-1 flex border-gray last:border-b-0 mx-auto hover:cursor-pointer hover:bg-primary/30 hover:rounded-xl px-2'
							key={element.userName}
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
