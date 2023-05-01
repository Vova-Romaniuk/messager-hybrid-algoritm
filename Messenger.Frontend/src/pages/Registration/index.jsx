import React, { useState, useEffect } from 'react';

import Button from '../../UI/Button';
import GoogleButton from '../../UI/GoogleButton';
import PasswordTextField from '../../UI/fields/PasswordField';
import TextField from '../../UI/fields/TextField';

export default function Registration() {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		userName: '',
	});
	useEffect(() => {
		console.log(formState);
	}, [formState]);
	const handleChangeEmail = (value) => {
		setFormState({ ...formState, email: value });
	};
	const handleChangePassword = (value) => {
		setFormState({ ...formState, password: value });
	};
	const handleChangeConfirmPassword = (value) => {
		setFormState({ ...formState, confirmPassword: value });
	};
	const handleChangeUsername = (value) => {
		setFormState({ ...formState, userName: value });
	};
	return (
		<div
			className='w-full h-screen flex'
			style={{ backgroundImage: "url('/images/registration-background.png')" }}
		>
			<div className='m-auto w-4/12 h-3/4 bg-primaryWhite rounded-2xl shadow-form'>
				<h3 className='text-center font-normal mt-2 text-2xl'>Ласкаво просимо!</h3>
				<form className='w-9/12 h-[90%] mx-auto flex flex-col justify-evenly'>
					<TextField
						required={true}
						type='email'
						placeholder='Введіть email'
						onChange={handleChangeEmail}
					/>
					<TextField
						required={true}
						type='text'
						placeholder='Введіть username'
						onChange={handleChangeUsername}
					/>
					<PasswordTextField
						placeholder='Введіть пароль'
						required={true}
						onChange={handleChangePassword}
					/>
					<PasswordTextField
						placeholder='Введіть пароль повторно'
						required={true}
						onChange={handleChangeConfirmPassword}
					/>
					<Button className='bg-[#8380F5] text-primaryWhite border-2 shadow-md'>
						Підтвердити
					</Button>
					<GoogleButton>Ввійти через Google</GoogleButton>
				</form>
			</div>
		</div>
	);
}
