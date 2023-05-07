import * as Yup from 'yup';

export const registrationSchema = Yup.object({
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
