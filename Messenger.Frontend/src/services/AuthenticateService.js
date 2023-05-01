import axios from 'axios';

import axiosInstanse from './domain/config';

const url = '/authenticate';

export const AuthenticateService = {
	authenticate: async ({ email, password }) => {
		try {
			const { data } = await axiosInstanse.post(url, { email, password });

			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},

	registration: async ({ email, password, userName }) => {
		try {
			const { data } = await axiosInstanse.post(`${url}/registration`, {
				email,
				password,
				userName,
			});

			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},

	googleAuthenticate: async ({ email, password, userName }) => {
		try {
			const { data } = await axiosInstanse.post(`${url}/google`, {
				email,
				password,
				userName,
			});

			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},

	googleVerifyToken: async (token) => {
		try {
			const { data } = await axios.get(
				`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
			);
			return data;
		} catch (err) {
			throw err;
		}
	},
};
