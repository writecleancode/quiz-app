import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const baseUrl = process.env.NODE_ENV === 'development' ? './' : '/quiz-app/';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: baseUrl,
	resolve: {
		alias: {
			src: '/src',
		},
	},
});
