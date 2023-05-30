/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	screens: {
		sm: { min: '450px', max: '450px' },
		md: { min: '768px', max: '991px' },
		lg: { min: '992px', max: '1199px' },
		xl: { min: '1200px' },
	},
	theme: {
		extend: {
			colors: {
				primary: '#8380F5',
			},
			boxShadow: {
				md: '0 3px 10px rgba(0, 0, 0, 0.5)',
				card: '0 15px 25px rgba(129, 124, 124, 0.4)',
				form: '0 3px 10px rgb(0 0 0 / 0.4);',
				user: '0px -25px 20px -20px rgba(0,0,0,0.45),0px 25px 20px -20px rgba(0,0,0,0.45)',
			},
			height: {
				screen: 'var(--webkit-fill-available)',
			},
		},
	},
	plugins: [],
};
