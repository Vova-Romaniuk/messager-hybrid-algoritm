import React from 'react';

import { Field, Form, Formik, ErrorMessage } from 'formik';

import Button from '../../UI/Button';
import TextField from '../../UI/fields/TextField';
import { userDataSchema } from '../../schemas/userDataSchema';

const UserProfileForm = ({ user, handleSubmit }) => {
	return (
		<Formik
			initialValues={{ ...user, description: user?.description || '' }}
			validationSchema={userDataSchema}
			onSubmit={handleSubmit}
		>
			{({ isValid }) => (
				<Form>
					<div className='w-2/3'>
						<div>
							<label htmlFor='email'>Email</label>
							<Field
								as={TextField}
								type='email'
								id='email'
								name='email'
								className='mb-1'
							/>
							<ErrorMessage
								name='email'
								component='div'
								className='text-red-500 text-xs'
							/>
						</div>
						<div>
							<label htmlFor='userName'>Ім`я користувача</label>
							<Field
								as={TextField}
								type='text'
								id='userName'
								name='userName'
								className='mb-1'
							/>
							<ErrorMessage
								name='userName'
								component='div'
								className='text-red-500 text-xs'
							/>
						</div>

						<div>
							<label htmlFor='fullName'>Повне Ім`я</label>
							<div className='w-full flex items-center'>
								<Field
									as={TextField}
									type='text'
									id='fullName'
									name='fullName'
									className='w-full mb-1'
								/>
							</div>
							<ErrorMessage
								name='fullName'
								component='div'
								className='text-red-500 text-xs'
							/>
						</div>
						<div>
							<label htmlFor='description'>Про себе</label>
							<Field
								as={TextField}
								multiline
								rows={4}
								id='description'
								name='description'
								placeholder='Про себе'
								className='mb-1'
							/>
							<ErrorMessage
								name='description'
								className='text-red-500 text-xs'
								component='div'
							/>
						</div>
						<Button
							className='h-10 mt-2 bg-primary text-white'
							type='submit'
							disabled={!isValid}
						>
							Зберегти
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default UserProfileForm;
