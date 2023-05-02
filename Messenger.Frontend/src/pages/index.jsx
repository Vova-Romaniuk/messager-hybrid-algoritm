import React from 'react';

import Authenticate from './Authenticate';
import Main from './Main';
import Registration from './Registration';

const routes = [
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/registration',
		element: <Registration />,
	},
	{
		path: '/authenticate',
		element: <Authenticate />,
	},
];

export default routes;
