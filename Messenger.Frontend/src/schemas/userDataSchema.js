import * as Yup from 'yup';

export const userDataSchema = Yup.object().shape({
	email: Yup.string().email('Невірний формат Email').required("Email обов'язковий"),
	userName: Yup.string().required("Ім'я користувача обов'язкове"),
	fullName: Yup.string().required("Повне ім'я обов'язкове"),
	description: Yup.string().required("Опис обов'язковий"),
});
