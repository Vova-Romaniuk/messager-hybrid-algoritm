import axiosInstanse from './domain/config';
import { Token } from './domain/token';

const url = '/room';

export const ChatService = {
	getById: async (id) => {
		try {
			const { data } = await axiosInstanse.get(`${url}/${id}`, {
				headers: {
					Authorization: `Bearer ${Token.get()}`,
				},
			});

			return data;
		} catch (error) {
			throw error;
		}
	},
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

	create: async (id, typeEncryption) => {
		try {
			const { data } = await axiosInstanse.post(url, {
				members: [id],
				typeEncryption,
			});

			return data;
		} catch (error) {
			throw error;
		}
	},
	delete: async (id) => {
		try {
			await axiosInstanse.delete(`${url}/${id}`);
		} catch (error) {
			throw error;
		}
	},

	clean: async (id) => {
		try {
			await axiosInstanse.delete(`${url}/${id}/clean`);
		} catch (error) {
			throw error;
		}
	},

	getPreview: async (id) => {
		try {
			const { data } = await axiosInstanse.get(`${url}/${id}/preview`, {
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
