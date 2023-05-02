import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../UI/Avatar';
import { changeMenuState, selectSidebarState } from '../../features/sidebar/sidebar.slice';
import { SIDEBAR_ICONS } from '../../utils/constants';

export default function Sidebar() {
	const dispatch = useDispatch();
	const activeName = useSelector(selectSidebarState);
	const styleContainerIcon =
		'w-12 h-12 grid place-items-center text-xl my-2 pointer cursor-pointer rounded-xl';
	return (
		<div className='w-16 h-screen border-r-2 border-gray flex flex-col'>
			<div className='w-full flex mt-5'>
				<Avatar className={'w-12 h-12'} />
			</div>
			<div className='flex flex-col w-fit mx-auto mt-28'>
				{SIDEBAR_ICONS.map((element) => (
					<div
						className={
							activeName === element.name
								? `${styleContainerIcon} bg-primary text-white `
								: styleContainerIcon
						}
						onClick={() => dispatch(changeMenuState(element.name))}
						key={element.name}
					>
						<i className={element.icon}></i>
					</div>
				))}
			</div>
			<div
				className={`${styleContainerIcon} hover:bg-primary hover:text-white mx-auto mb-8 mt-auto`}
			>
				<i className='fa-solid fa-right-from-bracket'></i>
			</div>
		</div>
	);
}
