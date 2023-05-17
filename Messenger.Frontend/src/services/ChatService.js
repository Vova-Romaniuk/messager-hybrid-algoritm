import axiosInstanse from './domain/config';

const url = '/room';

export const ChatService = {
	getById: async (id) => {
		try {
			const { data } = await axiosInstanse.get(`${url}/${id}`);

			return data;
		} catch (error) {
			throw error;
		}
	},
	get: async () => {
		try {
			const { data } = await axiosInstanse.get(url);

			return data;
		} catch (error) {
			throw error;
		}
	},

	create: async (id) => {
		try {
			const { data } = await axiosInstanse.post(url, {
				members: [id],
			});

			return data;
		} catch (error) {
			throw error;
		}
	},
};
