import type { Config } from 'tailwindcss';
// import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	theme: {
		extend: {
			colors: {
				primaryGray: {
					dark: '#2B2B2B',
					light: '#EDEDED',
				},
				secondaryGray: {
					dark: '#4A4A4A',
					light: '#C0C0C0',
				},
				text: {
					dark: '#FFFFFF',
					light: '#212121',
				},
				subtleText: {
					dark: '#B3B3B3',
					light: '#757575',
				},
				background: {
					dark: '#121212',
					light: '#FFFFFF',
				},
				hover: {
					dark: '#181818',
					light: '#F8F8F8',
				},
				hover2: {
					dark: '#1A1A1A',
					light: '#F4F4F4',
				},
				transparency: {
					dark: 'rgba(43, 43, 43, 0.76)',
					light: 'rgba(150, 150, 150, 0.6)',
				},
				primaryYellow: {
					dark: '#FFC107',
					light: '#FFA000',
				},
				accent: {
					secondaryYellow: '#FFD54F',
					blue: '#2196F3',
					green: '#4CAF50',
					red: '#F44336',
				},
			},
		},
	},
} as Partial<Config>;
