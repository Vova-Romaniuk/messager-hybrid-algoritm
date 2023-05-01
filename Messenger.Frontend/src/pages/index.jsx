import React from 'react';

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
];

export default routes;
