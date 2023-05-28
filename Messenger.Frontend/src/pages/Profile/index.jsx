import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import Loader from '../../components/Loader';
import { updateUserInfo, logOut } from '../../features/user/user.api';
import { selectUserData, selectUserLoading } from '../../features/user/user.slice';
import { PinnedService } from '../../services/PinnedService';
import AvatarUploadModal from './AvatarUploadModal';
import ProfileSvg from './ProfileSvg';
import UserProfileForm from './UserProfileForm';

const Profile = () => {
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();
	const isSmWidth = useMediaQuery({ query: '(max-width: 640px)' });

	const toggleModal = (value = false) => {
		setOpenModal(value);
	};

	const handleLogout = () => {
		dispatch(logOut()).then(() => {
			navigate('/authenticate');
		});
		PinnedService.delete();
	};
	const user = useSelector(selectUserData);
	const loading = useSelector(selectUserLoading);

	const handleSubmit = (values) => {
		dispatch(updateUserInfo(values));
	};

	return (
		<Loader isLoading={loading}>
			<div className='w-11/12 mx-auto p-4 max-sm:flex max-sm:flex-col'>
				<div className='my-16 max-sm:mt-8 max-sm:mb-2'>
					<h1 className='text-3xl font-bold max-sm:text-2xl max-sm:text-center'>
						Профіль користувача
					</h1>
					<h5 className='font-light max-sm:text-center max-sm:mt-2'>
						Тут ви можете змінити деякі дані про себе.
					</h5>
				</div>
				{/* Avatar */}
				<div className='flex justify-between w-full max-sm:flex-col'>
					<div className='h-fit py-5 w-1/2 rounded-xl flex flex-col max-sm:w-full'>
						<h2 className='text-xl font-bold mb-5 max-sm:text-center'>Змініть фото</h2>
						<div className='flex flex-col'>
							<div className='flex max-h-max mb-4 max-sm:flex-col'>
								<Avatar
									src={user?.image}
									className='h-32 w-32 mx-0 mr-16 max-sm:mx-auto max-sm:mb-3'
								/>
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
							<p className='text-sm text-black/60 max-sm:text-center'>
								Рекомендовано завантажувати фото розширення 256px×256px
							</p>
						</div>
					</div>
					<div className='w-1/2 max-h-[300px] bg-slate-500/5 p-5 rounded-2xl max-sm:hidden'>
						<ProfileSvg />
					</div>
				</div>
				{/* User info form */}
				<div className='w-2/3 max-sm:w-full max-sm:mx-auto'>
					<UserProfileForm user={user} handleSubmit={handleSubmit} />
				</div>
				{isSmWidth && (
					<div
						className='w-12 h-12 grid place-items-center text-xl my-2 pointer cursor-pointer bg-red-700 text-white rounded-xl mx-auto m-auto'
						onClick={handleLogout}
					>
						<i className='fa-solid fa-right-from-bracket'></i>
					</div>
				)}
			</div>
			{/* Upload avatar modal */}
			{openModal && (
				<AvatarUploadModal image={user?.image} handleClose={() => toggleModal(false)} />
			)}
		</Loader>
	);
};

export default Profile;
