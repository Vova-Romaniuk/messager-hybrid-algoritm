/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';

import Button from '../../UI/Button';
import GoogleButton from '../../UI/GoogleButton';
import PasswordTextField from '../../UI/fields/PasswordField';
import TextField from '../../UI/fields/TextField';
import { authenticate } from '../../features/user/user.api';
import { authenticateSchema } from '../../schemas/authenticateShema';

export default function Authenticate() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const initialState = {
		email: '',
		password: '',
	};

	const handleSubmit = (values) => {
		dispatch(authenticate(values)).then(() => {
			navigate('/profile');
		});
	};

	return (
		<div
			className={`w-full h-full flex bg-repeat-round`}
			style={{ backgroundImage: "url('/images/authenticate-background.png')" }}
		>
			<div className=' max-sm:w-11/12 max-lg:w-8/12 m-auto w-4/12 h-fit p-5 bg-white rounded-2xl shadow-form'>
				<h3 className='font-bold text-center mt-2 text-2xl'>Ласкаво просимо!</h3>
				<Formik
					initialValues={initialState}
					validationSchema={authenticateSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isValid }) => (
						<Form className='w-10/12 max-sm:w-11/12 h-[90%] mx-auto flex flex-col justify-evenly'>
							<Field
								as={TextField}
								required={true}
								type='text'
								name='email'
								placeholder='Введіть email'
							/>
							{errors.email && touched.email ? (
								<div className='text-red-500 text-xs'>{errors.email}</div>
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
							<Button
								className='bg-primary text-white border-2 mt-3'
								disabled={!isValid}
								type='submit'
							>
								Ввійти
							</Button>
							<GoogleButton>Ввійти через Google</GoogleButton>
							<Link
								className='text-blue-500 text-center w-full decoration-solid decoration-black'
								to='/registration'
							>
								В мене немає аккаунту.
							</Link>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
