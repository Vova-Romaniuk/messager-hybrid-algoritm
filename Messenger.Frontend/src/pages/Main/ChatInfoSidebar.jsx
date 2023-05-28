import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import { selectChat } from '../../features/chats/chats.slice';
import { HYBRID_ENCRYPTION_ALGORITHMS } from '../../utils/constants';

const ChatInfoSidebar = ({ onClick }) => {
	const { recipient } = useSelector(selectChat);
	const typeEncryption = HYBRID_ENCRYPTION_ALGORITHMS[recipient?.typeEncryption]?.name;
	const media = useMediaQuery({ maxWidth: ' 450px' });
	return (
		<div className='w-[500px] sm:w-full border-l-2 h-screen flex flex-col text-lg'>
			{media && (
				<Button onClick={onClick} className='mr-5 ml-auto mt-4'>
					<i className='fa-solid fa-xmark'></i>
				</Button>
			)}
			<div className='mx-auto mt-6'>
				<Avatar className='w-32 h-32' src={recipient?.image} />
			</div>
			<SidebarTitle title='Email:' description={recipient?.email} />
			<SidebarTitle title='Ім`я користувача:' description={recipient?.userName} />
			<SidebarTitle
				title='Повне ім`я:'
				description={recipient?.fullName || 'Користувач немає повного імені'}
			/>
			<SidebarTitle title='Про себе:' description={recipient?.description} />
			<SidebarTitle title='Тип шифрування:' description={typeEncryption} />
		</div>
	);
};
const SidebarTitle = ({ title, description }) => (
	<div className='my-4 flex flex-col px-3'>
		<span className='text-gray-500'>{title}</span>
		<span className='text-black text-xl font-bold'>{description}</span>
	</div>
);
export default ChatInfoSidebar;
