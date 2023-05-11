import React from 'react';

import SearchField from '../../UI/fields/SearchField';
import { fakeUsers } from '../../utils/constants';
import UserPreview from '../UserPreview';

const Users = () => {
	const users = fakeUsers;

	const handleChange = (value) => {
		console.log(value);
	};

	return (
		<div className='w-full h-full p-4'>
			<SearchField placeholder='Пошук користувачів...' onChange={handleChange} />
			<div className='h-[400px] overflow-y-auto px-5'>
				{users.map((user) => (
					<UserPreview key={user.id} user={user} />
				))}
			</div>
		</div>
	);
};

export default Users;
