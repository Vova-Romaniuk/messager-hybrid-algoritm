import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchCurrentUser } from '../../features/user/user.api';
import { Token } from '../../services/domain/token';
import Sidebar from '../Sidebar';
import SidebarChats from '../SidebarChats';

const AuthenticatedRoute = ({ element }) => {
	if (!Token.get()) {
		return <Navigate to='/authenticate' />;
	}

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, []);

	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<SidebarChats />
			{element}
		</div>
	);
};

export default AuthenticatedRoute;
