import React from 'react';

function Button({ children, className, type = 'button', ...custom }) {
	return (
		<button
			className={`disabled:opacity-50 px-4 py-2 border rounded-lg font-medium ${className}`}
			type={type}
			{...custom}
		>
			{children}
		</button>
	);
}
export default Button;
