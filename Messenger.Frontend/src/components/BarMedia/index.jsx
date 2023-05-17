import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changeMenuState, selectSidebarState } from '../../features/sidebar/sidebar.slice';
import { SIDEBAR_ICONS } from '../../utils/constants';

export default function BarMedia() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const activeName = useSelector(selectSidebarState);

	const styleContainerIcon =
		'w-12 h-12 grid place-items-center text-xl mx-2 pointer cursor-pointer rounded-xl';

	const handleClick = (name) => {
		dispatch(changeMenuState(name));
		if (name === 'profile') {
			navigate('/profile');
			return;
		}
		navigate('/');
	};

	return (
		<div className='w-full h-16 border-t-2 border-gray flex '>
			<div className='flex w-fit m-auto'>
				{SIDEBAR_ICONS.map((element) => (
					<div
						className={
							activeName === element.name
								? `${styleContainerIcon} bg-primary text-white`
								: `${styleContainerIcon} hover:bg-primary hover:text-white`
						}
						onClick={() => handleClick(element.name)}
						key={element.name}
					>
						<i className={element.icon}></i>
					</div>
				))}
			</div>
		</div>
	);
}
