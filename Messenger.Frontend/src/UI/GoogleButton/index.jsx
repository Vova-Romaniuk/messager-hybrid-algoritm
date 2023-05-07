import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGoogleLogin } from '@react-oauth/google';

import { googleAuthenticate } from '../../features/user/user.api';

export default function GoogleButton({ children }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = useGoogleLogin({
		// eslint-disable-next-line camelcase
		onSuccess: ({ access_token }) =>
			// eslint-disable-next-line implicit-arrow-linebreak
			dispatch(googleAuthenticate(access_token)).then(() => {
				navigate('/');
			}),
		onError: () => {
			('Login Failed');
		},
	});

	return (
		<button
			type='button'
			onClick={handleLogin}
			className='font-medium justify-center my-3 px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'
		>
			<img
				className='w-6 h-6'
				src='https://www.svgrepo.com/show/475656/google-color.svg'
				loading='lazy'
				alt='google logo'
			/>
			<span>{children}</span>
		</button>
	);
}
