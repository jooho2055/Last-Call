/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				landingpagebg: "url('./images/landingpage.jpg')",
				custombg:
					'radial-gradient(circle, rgba(222,105,19,0.1153054971988795) 0%, rgba(222,131,63,0.28617384453781514) 27%, rgba(159,151,149,0.8183867296918768) 75%, rgba(115,136,160,1) 100%)',
				buttonbg:
					'linear-gradient(90deg, rgba(174,191,210,0.26376488095238093) 0%, rgba(145,164,185,1) 50%, rgba(115,136,160,1) 100%)',
			},
			backgroundColor: {
				primary: '#DE6913',
				primaryVariant: '#cb6114',
				primaryGrayBlue: '#7388a0',
			},
		},
		screens: {
			'2xl': { max: '1535px' },
			// => @media (max-width: 1535px) { ... }

			xl: { max: '1279px' },
			// => @media (max-width: 1279px) { ... }

			custom1175: { max: '1175px' },
			// => @media (max-width: 1175px) { ... }

			custom1050: { max: '1050px' },

			lg: { max: '1023px' },
			// => @media (max-width: 1023px) { ... }

			custom850: { max: '850px' },

			md: { max: '767px' },
			// => @media (max-width: 767px) { ... }

			custom720: { max: '720px' },

			sm: { max: '639px' },
			// => @media (max-width: 639px) { ... }

			sx: { max: '585px' },
			// => @media (max-width: 585px) { ... }
		},
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
};

