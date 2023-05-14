import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = ({ children, isLoading, className = '' }) => {
	return isLoading ? (
		<div className={`w-full h-full grid place-items-center ${className}`}>
			<MoonLoader size={80} />
		</div>
	) : (
		children
	);
};

export default Loader;
