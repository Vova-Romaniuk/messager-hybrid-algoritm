import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import Loader from '../../components/Loader';
import { updateUserInfo } from '../../features/user/user.api';
import { selectUserData, selectUserLoading } from '../../features/user/user.slice';
import AvatarUploadModal from './AvatarUploadModal';
import ProfileSvg from './ProfileSvg';
import UserProfileForm from './UserProfileForm';

const Profile = () => {
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);

	const toggleModal = (value = false) => {
		setOpenModal(value);
	};

	const user = useSelector(selectUserData);
	const loading = useSelector(selectUserLoading);

	const handleSubmit = (values) => {
		dispatch(updateUserInfo(values));
	};

	return (
		<Loader isLoading={loading}>
			<div className='w-10/12 mx-auto p-4'>
				<div className='my-16'>
					<h1 className='text-3xl font-bold'>Профіль користувача</h1>
					<h5 className='font-light'>Тут ви можете змінити деякі данні про себе.</h5>
				</div>
				{/* Avatar */}
				<div className='flex justify-between w-full'>
					<div className='h-fit py-5 w-1/2 rounded-xl flex flex-col'>
						<h2 className='text-xl font-bold mb-5'>Змініть фото</h2>
						<div className='flex flex-col'>
							<div className='flex max-h-max mb-4'>
								<Avatar src={user?.image} className='h-32 w-32 mx-0 mr-16' />
								<div className='flex flex-col items-center justify-center'>
									<Button
										className='bg-primary text-white mb-3 w-52'
										onClick={() => toggleModal(true)}
									>
										Змінити фото
									</Button>
									<Button className='w-52'>
										<i className='fas fa-trash-can mr-3'></i>
										Видалити фото
									</Button>
								</div>
							</div>
							<p className='text-sm text-black/60'>
								Рекомендовано завантажувати фото розширення 256px×256px
							</p>
						</div>
					</div>
					<div className='w-1/2 max-h-[300px] bg-slate-500/5 p-5 rounded-2xl'>
						<ProfileSvg />
					</div>
				</div>
				{/* User info form */}
				<div className='w-2/3'>
					<UserProfileForm user={user} handleSubmit={handleSubmit} />
				</div>
			</div>
			{/* Upload avatar modal */}
			{openModal && (
				<AvatarUploadModal image={user?.image} handleClose={() => toggleModal(false)} />
			)}
		</Loader>
	);
};

export default Profile;
