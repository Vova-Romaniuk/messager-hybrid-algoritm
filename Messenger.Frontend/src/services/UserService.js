import axiosInstanse from './domain/config';
import { Token } from './domain/token';

const url = '/user';

export const UserService = {
	get: async () => {
		try {
			const { data } = await axiosInstanse.get(url, {
				headers: {
					Authorization: `Bearer ${Token.get()}`,
				},
			});

			return data;
		} catch (error) {
			throw error;
		}
	},

	update: async (user) => {
		try {
			const { data } = await axiosInstanse.put(url, user, {
				headers: {
					Authorization: `Bearer ${Token.get()}`,
				},
			});

			return data;
		} catch (error) {
			throw error;
		}
	},
	uploadImage: async (image) => {
		try {
			const { data } = await axiosInstanse.patch(
				url,
				{ image },
				{
					headers: {
						Authorization: `Bearer ${Token.get()}`,
					},
				}
			);

			return data;
		} catch (error) {
			throw error;
		}
	},
	getUsers: async (searchWord = '') => {
		try {
			const { data } = await axiosInstanse.get(`${url}/search?keyword=${searchWord}`, {
				headers: {
					Authorization: `Bearer ${Token.get()}`,
				},
			});

			return data;
		} catch (error) {
			throw error;
		}
	},
};
