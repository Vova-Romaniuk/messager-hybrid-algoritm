import axiosInstanse from './domain/config';

const url = '/user';

export const UserService = {
	get: async () => {
		try {
			const { data } = await axiosInstanse.get(url);

			return data;
		} catch (error) {
			throw error;
		}
	},
};
