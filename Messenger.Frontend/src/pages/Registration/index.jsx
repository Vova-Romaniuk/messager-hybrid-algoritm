import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';

import Button from '../../UI/Button';
import GoogleButton from '../../UI/GoogleButton';
import PasswordTextField from '../../UI/fields/PasswordField';
import TextField from '../../UI/fields/TextField';
import { registration } from '../../features/user/user.api';
import { registrationSchema } from '../../schemas/registrationSchema';

export default function Registration() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const initialState = {
		email: '',
		password: '',
		confirmPassword: '',
		userName: '',
	};

	const handleSubmit = async ({ email, password, userName }) => {
		const res = await dispatch(registration({ email, password, userName }));
		if (registration.fulfilled.match(res)) {
			navigate('/');
		}
	};

	return (
		<div
			className='w-full h-screen flex bg-repeat-round'
			style={{ backgroundImage: "url('/images/registration-background.png')" }}
		>
			<div className=' max-sm:w-11/12 max-lg:w-8/12 m-auto w-4/12 h-fit p-5 bg-white rounded-2xl shadow-form'>
				<h3 className='font-bold text-center mt-2 text-2xl'>Ласкаво просимо!</h3>
				<Formik
					initialValues={initialState}
					validationSchema={registrationSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isValid }) => (
						<Form className='w-10/12 max-sm:w-11/12 h-[90%] mx-auto flex flex-col justify-evenly'>
							<Field
								as={TextField}
								required={true}
								type='email'
								name='email'
								placeholder='Введіть email'
							/>
							{errors.email && touched.email ? (
								<div className='text-red-500 text-xs'>{errors.email}</div>
							) : null}
							<Field
								as={TextField}
								required={true}
								type='text'
								name='userName'
								placeholder='Введіть username'
							/>
							{errors.userName && touched.userName ? (
								<div className='text-red-500 text-xs'>{errors.userName}</div>
							) : null}
							<Field
								as={PasswordTextField}
								placeholder='Введіть пароль'
								required={true}
								name='password'
								minLength={8}
							/>
							{errors.password && touched.password ? (
								<div className='text-red-500 text-xs'>{errors.password}</div>
							) : null}
							<Field
								as={PasswordTextField}
								placeholder='Введіть пароль повторно'
								required={true}
								name='confirmPassword'
								minLength={8}
							/>
							{errors.confirmPassword && touched.confirmPassword ? (
								<div className='text-red-500 text-xs'>{errors.confirmPassword}</div>
							) : null}
							{errors.error && touched.error ? (
								<div className='text-red-500 text-xs'>{errors.error}</div>
							) : null}
							<Button
								className='bg-primary text-white border-2 mt-3'
								disabled={!isValid}
								type='submit'
							>
								Підтвердити
							</Button>
							<GoogleButton>Ввійти через Google</GoogleButton>
							<Link
								to='/authenticate'
								className='text-blue-500 text-center decoration-solid decoration-black'
							>
								В мене вже є аккаунт
							</Link>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
