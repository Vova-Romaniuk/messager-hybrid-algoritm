import React from 'react';

import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Authenticate from './Authenticate';
import Main from './Main';
import EmptyMessagesWrapper from './Main/EmptyMessagesWrapper';
import Profile from './Profile';
import Registration from './Registration';

const routes = [
	{
		path: '/:id',
		element: <AuthenticatedRoute element={<Main />} />,
	},
	{
		path: '/',
		element: <AuthenticatedRoute element={<EmptyMessagesWrapper />} />,
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
