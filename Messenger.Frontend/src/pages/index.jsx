import React from 'react';

import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Authenticate from './Authenticate';
import Main from './Main';
import Profile from './Profile';
import Registration from './Registration';

const routes = [
	{
		path: '/',
		element: <AuthenticatedRoute element={<Main />} />,
	},
	{
		path: '/registration',
		element: <Registration />,
	},
	{
		path: '/authenticate',
		element: <Authenticate />,
	},
	{
		path: '/profile',
		element: <AuthenticatedRoute element={<Profile />} />,
	},
];

export default routes;
