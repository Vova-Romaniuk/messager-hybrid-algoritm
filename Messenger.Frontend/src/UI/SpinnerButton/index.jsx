import React, { useState } from 'react';

import Button from '../Button';

const SpinnerButton = ({
	onClick,
	isLoading,
	children,
	className = '',
	disabled = false,
	...custom
}) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = async () => {
		setIsClicked(true);
		await onClick();
		setIsClicked(false);
	};

	return (
		<Button
			className={`flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors disabled:opacity-50 ${className}`}
			onClick={handleClick}
			disabled={disabled && (isLoading || isClicked)}
			{...custom}
		>
			{isLoading || isClicked ? (
				<svg
					className='animate-spin h-5 w-5 mr-2'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z'
					></path>
				</svg>
			) : null}
			{children}
		</Button>
	);
};

export default SpinnerButton;
