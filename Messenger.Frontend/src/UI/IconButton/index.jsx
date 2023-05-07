import React from 'react';

const IconButton = ({ icon, ...custom }) => {
	return (
		<button {...custom} className='h-10 w-10 hover:bg-black/20 duration-200 rounded-full'>
			<i className={`text-2xl ${icon}`}></i>
		</button>
	);
};

export default IconButton;
