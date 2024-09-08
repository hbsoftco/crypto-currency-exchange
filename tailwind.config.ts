import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
	theme: {
		extend: {
			colors: {
				'primary-yellow': {
					50: '#fffcea',
					100: '#fff4c5',
					200: '#ffe985',
					300: '#ffd746',
					400: '#ffc107',
					500: '#ffa000',
					600: '#e27800',
					700: '#bb5202',
					800: '#983f08',
					900: '#7c340b',
					950: '#481900',
					DEFAULT: '#ffa000',
					dark: '#FFC107',
					light: '#FFA000',
				},
				'primary-gray': {
					50: '#f6f6f6',
					100: '#EDEDED',
					200: '#d1d1d1',
					300: '#b0b0b0',
					400: '#888888',
					500: '#6d6d6d',
					600: '#5d5d5d',
					700: '#4f4f4f',
					800: '#454545',
					900: '#2b2b2b',
					950: '#2b2b2b',
					DEFAULT: '#2b2b2b',
					dark: '#2B2B2B',
					light: '#EDEDED',
				},
				'secondary-gray': {
					dark: '#4A4A4A',
					light: '#C0C0C0',
					50: '#4B4B4B',
				},
				'text': {
					dark: '#212121',
					light: '#FFFFFF',
				},
				'subtle-text': {
					dark: '#B3B3B3',
					light: '#757575',
					50: '#A6A6A6',
				},
				'background': {
					dark: '#121212',
					light: '#FFFFFF',
					50: '#4b4b4b',
				},
				'hover': {
					dark: '#181818',
					light: '#F8F8F8',
				},
				'hover2': {
					dark: '#1A1A1A',
					light: '#F4F4F4',
					50: '#1F1F1F',
				},
				'transparency': {
					dark: 'rgba(43, 43, 43, 0.76)',
					light: 'rgba(150, 150, 150, 0.6)',
				},
				'accent': {
					secondaryYellow: '#FFD54F',
					blue: '#2196F3',
					green: '#4CAF50',
					red: '#F44336',
				},
			},
			fontFamily: {
				dana: ['dana'],
			},
			container: {
				center: true,
				screens: {
					// 'sm': '100%',
					// 'md': '800px',
					// 'lg': '1024px',
					// 'xl': '1280px',
					// '2xl': {
					// 	max: '1836px',
					// 	min: '1536px',
					// },
				},
			},
		},
	},
	darkMode: 'class',
};
