/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primaryWhite: '#ffffff',
			},
			boxShadow: {
				md: '0 3px 10px rgba(0, 0, 0, 0.5)',
				card: '0 15px 25px rgba(129, 124, 124, 0.4)',
				form: '0 3px 10px rgb(0 0 0 / 0.4);',
			},
		},
	},
	plugins: [],
};
