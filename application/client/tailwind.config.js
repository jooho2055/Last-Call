/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				landingpagebg: "url('./images/landingpage.jpg')",
			},
		},
	},
	plugins: [],
};
