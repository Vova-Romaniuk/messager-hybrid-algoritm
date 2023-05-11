import React from 'react';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';

const UserPreview = ({ user }) => {
	const { userName, email, image } = user;
	return (
		<div className='border-t last:border-b flex p-4 justify-between'>
			<div className='flex items-center'>
				<Avatar src={image} className='mr-4' />
				<div>
					<h1 className='font-bold text-xl'>{userName}</h1>
					<h2>{email}</h2>
				</div>
			</div>
			<Button>
				Написати <i className='fas fa-envelope'></i>
			</Button>
		</div>
	);
};

export default UserPreview;
