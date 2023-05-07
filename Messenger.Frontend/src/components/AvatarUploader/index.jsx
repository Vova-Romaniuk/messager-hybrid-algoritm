import React from 'react';
import Dropzone from 'react-dropzone';

// const defaultAvatar = '/images/defaultAvatar.jpeg';

const AvatarUploader = ({ handleDrop }) => {
	return (
		<Dropzone onDrop={handleDrop}>
			{({ getRootProps, getInputProps }) => (
				<div
					{...getRootProps()}
					className='mx-auto border-2 bg-slate-200 h-52 w-52 rounded-xl grid place-items-center my-3 cursor-pointer'
				>
					<input {...getInputProps()} />
					<div className='text-center opacity-50'>
						<p className='text-xl font-light'>
							Перетяніть сюди файл, або натисьніть щоб вибрати!
						</p>
						<i className='fas fa-image text-2xl'></i>
					</div>
				</div>
			)}
		</Dropzone>
	);
};

export default AvatarUploader;
