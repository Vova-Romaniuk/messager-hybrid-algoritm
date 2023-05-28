const KEY = 'chats';

export const PinnedService = {
	add: (id) => {
		const prevData = JSON.parse(localStorage.getItem(KEY));
		if (!prevData) {
			localStorage.setItem(KEY, JSON.stringify([id]));
			return;
		}
		localStorage.setItem(KEY, JSON.stringify([...prevData, id]));
	},
	remove: (id) => {
		const prevData = JSON.parse(localStorage.getItem(KEY));
		localStorage.setItem(KEY, JSON.stringify(prevData.filter((item) => item !== id)));
	},
	get: () => JSON.parse(localStorage.getItem(KEY)),
	set: (token) => localStorage.setItem(KEY, token),
	delete: () => localStorage.removeItem(KEY),
};
