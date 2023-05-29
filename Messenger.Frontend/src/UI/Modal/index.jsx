import React from 'react';

const Modal = ({ children, handleClose, className = '' }) => {
	return (
		<div className='absolute z-40 w-full top-0 left-0 h-full bg-black/20' onClick={handleClose}>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`bg-white z-50 w-fit h-fit -translate-x-2/4 -translate-y-2/4 left-1/2 top-1/2 absolute rounded-xl ${className} `}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
