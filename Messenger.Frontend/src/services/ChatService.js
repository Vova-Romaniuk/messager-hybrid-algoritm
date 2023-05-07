import axiosInstanse from './domain/config';

const url = '/chat';

export const ChatService = {
	getById: async (id) => {
		try {
			const { data } = await axiosInstanse.get(`${url}/${id}`);

			return data;
		} catch (error) {
			throw error;
		}
	},
};
