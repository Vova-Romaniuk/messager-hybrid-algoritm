import React from 'react';

import Sidebar from '../../components/Sidebar';
import SidebarChats from '../../components/SidebarChats';

const Main = () => {
	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<SidebarChats />
		</div>
	);
};

export default Main;
