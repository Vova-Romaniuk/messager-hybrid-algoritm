import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';

import { AuthenticateService } from '../../services/AuthenticateService';
import { UserService } from '../../services/UserService';
import { showApiEndpointErrorAlert, showSuccessAlert } from '../../services/alert';
import { Token } from '../../services/domain/token';

export const googleAuthenticate = createAsyncThunk(
	'user/googleAuthenticate',
	async (googleToken, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const { name, picture, email } = await AuthenticateService.googleVerifyToken(
				googleToken
			);

			const { data, status } = await AuthenticateService.googleAuthenticate({
				email,
				picture,
				fullName: name,
			});

			Token.set(data.token);

			if (status === HttpStatusCode.Created) {
				showSuccessAlert('Ласкаво просимо!');
			}

			if (status === HttpStatusCode.Ok) {
				showSuccessAlert('З поверненням!');
			}
			dispatch(fetchCurrentUser());

			return fulfillWithValue();
		} catch (error) {
			showApiEndpointErrorAlert(error);
			return rejectWithValue();
		}
	}
);

export const registration = createAsyncThunk(
	'user/registration',
	async ({ email, password, userName }, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const { data, status } = await AuthenticateService.registration({
				email,
				password,
				userName,
			});
			Token.set(data.token);

			if (status === HttpStatusCode.Created) {
				showSuccessAlert('Ласкаво просимо!');
			}

			dispatch(fetchCurrentUser());

			return fulfillWithValue();
		} catch (error) {
			showApiEndpointErrorAlert(error);
			return rejectWithValue();
		}
	}
);

export const authenticate = createAsyncThunk(
	'user/authenticate',
	async ({ email, password }, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const data = await AuthenticateService.authenticate({ email, password });

			Token.set(data.token);
			showSuccessAlert('З поверненням!');
			dispatch(fetchCurrentUser());

			return fulfillWithValue(null);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue(null);
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'user/fetchCurrentUser',
	async (_, { fulfillWithValue, rejectWithValue }) => {
		try {
			const user = await UserService.get();

			return fulfillWithValue(user);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue();
		}
	}
);

export const logOut = createAsyncThunk(
	'user/logout',
	async (_, { fulfillWithValue, rejectWithValue }) => {
		try {
			await AuthenticateService.logout();
			Token.delete();

			return fulfillWithValue();
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue();
		}
	}
);

export const updateUserInfo = createAsyncThunk(
	'user/updateUserInfo',
	async (user, { fulfillWithValue, rejectWithValue }) => {
		try {
			await UserService.update(user);

			showSuccessAlert('Ваші данні успішно обновлено!');

			return fulfillWithValue(user);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue(null);
		}
	}
);

export const uploadUserImage = createAsyncThunk(
	'user/uploadUserImage',
	async (image, { fulfillWithValue, rejectWithValue }) => {
		try {
			await UserService.uploadImage(image);

			showSuccessAlert('Ваше фото успішно обновлено!');

			return fulfillWithValue(image);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue(null);
		}
	}
);

export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (searchWord, { fulfillWithValue, rejectWithValue }) => {
		try {
			const users = await UserService.getUsers(searchWord || '');

			return fulfillWithValue(users);
		} catch (error) {
			showApiEndpointErrorAlert(error);
			return rejectWithValue();
		}
	}
);
