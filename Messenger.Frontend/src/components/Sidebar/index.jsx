import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Avatar from '../../UI/Avatar';
import { changeMenuState, selectSidebarState } from '../../features/sidebar/sidebar.slice';
import { logOut } from '../../features/user/user.api';
import { PinnedService } from '../../services/PinnedService';
import { SIDEBAR_ICONS } from '../../utils/constants';

export default function Sidebar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const avatar = useSelector((state) => state.user?.data?.image);
	const activeName = useSelector(selectSidebarState);

	const styleContainerIcon =
		'w-12 h-12 grid place-items-center text-xl my-2 pointer cursor-pointer rounded-xl';

	const handleClick = (name) => {
		dispatch(changeMenuState(name));
		if (name === 'profile') {
			navigate('/profile');
			return;
		}

		navigate('/');
	};

	const handleLogout = () => {
		dispatch(logOut()).then(() => {
			navigate('/authenticate');
		});
		PinnedService.delete();
	};

	return (
		<div className='w-16 h-full border-r-2 border-gray flex flex-col'>
			<div className='w-full flex mt-5'>
				<Link className='m-auto' to='/profile'>
					<Avatar className={'w-12 h-12'} src={avatar} />
				</Link>
			</div>
			<div className='flex flex-col w-fit m-auto'>
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
			<div
				className={`${styleContainerIcon} hover:bg-primary hover:text-white mx-auto mb-8 m-auto`}
				onClick={handleLogout}
			>
				<i className='fa-solid fa-right-from-bracket'></i>
			</div>
		</div>
	);
}
