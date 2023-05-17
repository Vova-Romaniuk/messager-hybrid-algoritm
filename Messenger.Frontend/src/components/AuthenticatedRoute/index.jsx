import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Navigate } from 'react-router-dom';

import { selectIsOpenChat } from '../../features/chats/chats.slice';
import { fetchCurrentUser } from '../../features/user/user.api';
import { Token } from '../../services/domain/token';
import BarMedia from '../BarMedia';
import ChatRoomMedia from '../ChatRoomMedia';
import ChatsMedia from '../ChatsMedia';
import Sidebar from '../Sidebar';
import SidebarChats from '../SidebarChats';

const AuthenticatedRoute = ({ element }) => {
	if (!Token.get()) {
		return <Navigate to='/authenticate' />;
	}
	// eslint-disable-next-line no-unused-vars
	const isChatOpen = useSelector(selectIsOpenChat);
	const media = useMediaQuery({ maxWidth: ' 450px' });
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, []);

	return !media ? (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<SidebarChats />
			<div className='w-[calc(100%-24rem)] h-full overflow-y-auto'>{element}</div>
		</div>
	) : !isChatOpen ? (
		<div className='w-full h-screen flex-col'>
			<ChatsMedia />
			<BarMedia />
		</div>
	) : (
		<div className='w-full h-screen flex-col'>
			<ChatRoomMedia />
		</div>
	);
};

export default AuthenticatedRoute;
