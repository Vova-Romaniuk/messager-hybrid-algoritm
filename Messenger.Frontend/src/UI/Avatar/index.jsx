import React from 'react';

export default function Avatar({ className, src }) {
	return (
		<div className={`rounded-full w-12 h-12 overflow-hidden m-auto shadow-lg  ${className}`}>
			<img src={src || '/images/defaultAvatar.jpeg'} className='w-full h-full object-cover' />
		</div>
	);
}
