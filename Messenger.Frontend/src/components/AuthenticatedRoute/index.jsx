import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Navigate } from 'react-router-dom';

import { selectIsOpenChat } from '../../features/chats/chats.slice';
import { selectSidebarState } from '../../features/sidebar/sidebar.slice';
import { fetchCurrentUser } from '../../features/user/user.api';
import { Token } from '../../services/domain/token';
import BarMedia from '../BarMedia';
// import ChatRoomMedia from '../ChatRoomMedia';
import ChatsMedia from '../ChatsMedia';
//import NotificationContainer from '../NotificationContainer';
import Sidebar from '../Sidebar';
import SidebarChats from '../SidebarChats';

const AuthenticatedRoute = ({ element }) => {
	if (!Token.get()) {
		return <Navigate to='/authenticate' />;
	}
	const activeIcon = useSelector(selectSidebarState);
	// eslint-disable-next-line no-unused-vars
	const isChatOpen = useSelector(selectIsOpenChat);
	const media = useMediaQuery({ maxWidth: ' 450px' });
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, []);

	return !media ? (
		<div className='w-full h-screen flex relative'>
			<Sidebar />
			<SidebarChats />
			<div className='w-[calc(100%-24rem)] h-full overflow-y-auto'>{element}</div>
			{/* <NotificationContainer /> */}
		</div>
	) : (
		<div className='w-full h-screen flex flex-col relative'>
			{!isChatOpen && activeIcon === 'messages' ? (
				<ChatsMedia />
			) : (
				activeIcon !== 'messages' && (
					<div className='w-full h-[calc(100%-4rem)] overflow-y-auto'>{element}</div>
				)
			)}
			{isChatOpen ? (
				<div className='w-full h-screen overflow-y-auto'>{element}</div>
			) : (
				<BarMedia />
			)}
			{/* <NotificationContainer /> */}
		</div>
	);
};

export default AuthenticatedRoute;
