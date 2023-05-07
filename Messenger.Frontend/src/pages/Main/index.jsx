import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInfoSidebar from './ChatInfoSidebar';

const Main = () => {
	const [open, setOpen] = useState(false);
	const { id } = useParams();

	useEffect(() => {}, [id]);

	const toggleSidebar = () => {
		setOpen(!open);
	};

	return (
		<div className='w-full flex'>
			<div className='w-full'>
				<ChatHeader infoOpen={toggleSidebar} />
				<ChatContainer />
			</div>
			{open && <ChatInfoSidebar />}
		</div>
	);
};

export default Main;
