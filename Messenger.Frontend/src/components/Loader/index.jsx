import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = ({ children, isLoading }) => {
	return isLoading ? (
		<div className='w-full h-screen grid place-items-center'>
			<MoonLoader size={80} />
		</div>
	) : (
		children
	);
};

export default Loader;
