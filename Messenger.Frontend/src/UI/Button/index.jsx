import React from 'react';

export default function Button({ children, className }) {
	return (
		<button className={`px-4 py-2 border rounded-lg font-medium ${className}`} type='submit'>
			{children}
		</button>
	);
}
