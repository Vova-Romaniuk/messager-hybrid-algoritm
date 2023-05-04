import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';

import { AuthenticateService } from '../../services/AuthenticateService';
import { UserService } from '../../services/UserService';
import { showApiEndpointErrorAlert, showSuccessAlert } from '../../services/alert';
import { Token } from '../../services/domain/token';

export const googleAuthenticate = createAsyncThunk(
	'user/googleAuthenticate',
	async (googleToken, { fulfillWithValue, rejectWithValue }) => {
		try {
			const { name, picture, email } = await AuthenticateService.googleVerifyToken(
				googleToken
			);

			const { status } = await AuthenticateService.googleAuthenticate({
				email,
				picture,
				userName: name,
			});

			if (status === HttpStatusCode.Created) {
				showSuccessAlert('Ласкаво просимо!');
			}

			if (status === HttpStatusCode.Ok) {
				showSuccessAlert('З поверненням!');
			}
			// dispatch(fetchCurrentUser());
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
	async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
		try {
			const data = await AuthenticateService.authenticate({ email, password });

			Token.set(data.token);
			showSuccessAlert('З поверненням!');

			return fulfillWithValue();
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue();
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'user/fetchCurrentUser',
	async (_, { fulfillWithValue, rejectWithValue }) => {
		try {
			const { data } = await UserService.get();

			return fulfillWithValue(data);
		} catch (error) {
			showApiEndpointErrorAlert(error);

			return rejectWithValue();
		}
	}
);
