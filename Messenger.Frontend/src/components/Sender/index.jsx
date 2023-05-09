import React, { useState, useRef } from 'react';

import Button from '../../UI/Button';

export default function Sender() {
	const [value, setValue] = useState('');
	const textAreaRef = useRef(null);

	const resizeTextArea = () => {
		textAreaRef.current.style.height = '20px';
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
	};

	const handleKeyDowm = (event) => {
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			handleClick();
		} else if (event.keyCode === 13 && event.shiftKey) {
			textAreaRef.current.value += '\n';
		}
	};

	const handleChange = (e) => {
		resizeTextArea();
		setValue(e.target.value);
	};

	const handleClick = () => {
		if (value.trim() !== '') {
			setValue('');
		}
	};

	return (
		<form className='h-fit w-11/12 items-center bg-white mx-auto my-auto flex rounded-xl border-[#8D8B91] border-2'>
			<textarea
				className='ml-5 w-10/12 max-h-[100px] h-6 bg-transparent border-0 border-[#8D8B91] outline-none resize-none scroll-none font-medium text-[#8D8B91] placeholder:text-[#8D8B91]'
				placeholder='Input your message'
				value={value}
				ref={textAreaRef}
				onChange={handleChange}
				onKeyDown={(event) => handleKeyDowm(event)}
			/>
			<Button
				className='bg-transparent w-12 mt-auto mr-4 ml-auto text-[#8D8B91] border-none'
				onClick={handleClick}
				type='submit'
			>
				<i className='fa-solid fa-paper-plane'></i>
			</Button>
		</form>
	);
}
