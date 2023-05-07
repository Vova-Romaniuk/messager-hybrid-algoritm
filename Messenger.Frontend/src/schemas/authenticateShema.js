import * as Yup from 'yup';

export const authenticateSchema = Yup.object({
	email: Yup.string()
		.email('Неправильний формат email')
		.required("Поле обов'язкове для заповнення"),
	password: Yup.string()
		.required("Поле обов'язкове для заповнення")
		.min(8, 'Пароль повинен містити мінімум 8 символів'),
});
