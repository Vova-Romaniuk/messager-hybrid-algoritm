const KEY = 'token';

export const Token = {
	get: () => localStorage.getItem(KEY),
	set: (token) => localStorage.setItem(KEY, token),
};
