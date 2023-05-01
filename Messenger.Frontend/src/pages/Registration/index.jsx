import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Button from '../../UI/Button';
import GoogleButton from '../../UI/GoogleButton';
import PasswordTextField from '../../UI/fields/PasswordField';
import TextField from '../../UI/fields/TextField';
import { registration } from '../../features/user/user.api';

const registrationSchema = Yup.object({
	email: Yup.string()
		.email('Неправильний формат email')
		.required("Поле обов'язкове для заповнення"),
	userName: Yup.string(),
	password: Yup.string()
		.required("Поле обов'язкове для заповнення")
		.min(8, 'Пароль повинен містити мінімум 8 символів'),
	confirmPassword: Yup.string()
		.required("Поле обов'язкове для заповнення")
		.oneOf([Yup.ref('password')], 'Паролі не співпадають'),
});

export default function Registration() {
	const dispatch = useDispatch();
	const initialState = {
		email: '',
		password: '',
		confirmPassword: '',
		userName: '',
	};

	const handleSubmit = ({ email, password, userName }) => {
		dispatch(registration({ email, password, userName }));
	};

	return (
		<div
			className='w-full h-screen flex'
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
						<Form className='w-9/12 max-sm:w-11/12 h-[90%] mx-auto flex flex-col justify-evenly'>
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
								to='/login'
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
