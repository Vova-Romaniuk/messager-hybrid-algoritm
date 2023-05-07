import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import AvatarUploader from '../../components/AvatarUploader';
import { uploadUserImage } from '../../features/user/user.api';
import { ImageService } from '../../services/ImageService';

const AvatarUploadModal = ({ image, handleClose }) => {
	const [avatar, setAvatar] = useState(image);
	const dispatch = useDispatch();

	const handleDelete = () => {
		setAvatar('');
	};

	const toDefault = () => {
		setAvatar(image);
	};

	const handleSave = () => {
		dispatch(uploadUserImage(avatar));
	};

	const onDrop = async (acceptedFiles) => {
		const newImage = await ImageService.upload(acceptedFiles[0]);
		setAvatar(newImage);
	};

	return (
		<Modal className='w-[400px] h-fit p-5' handleClose={handleClose}>
			<h1 className='text-center font-bold text-2xl mb-4'>Завантажте зображення</h1>
			<div className='flex flex-col justify-center'>
				{avatar ? (
					<React.Fragment>
						<Avatar src={avatar} className='w-52 h-52 my-3' />
						{avatar === image ? (
							<Button onClick={handleDelete}>Замінити</Button>
						) : (
							<Button className='bg-primary text-white' onClick={handleSave}>
								Зберегти
							</Button>
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						<AvatarUploader image={avatar} handleDrop={onDrop} />
						<Button className='bg-primary text-white my-3'>Зберегти</Button>
						<Button onClick={toDefault}>Повернути минуле</Button>
					</React.Fragment>
				)}
			</div>
		</Modal>
	);
};

export default AvatarUploadModal;
