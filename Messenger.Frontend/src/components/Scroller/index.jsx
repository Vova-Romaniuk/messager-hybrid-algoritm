import React from 'react';

export default function Scroller({ children }) {
	return <div className='h-full w-full overflow-y-auto scroll-none'>{children}</div>;
}
