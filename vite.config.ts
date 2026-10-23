import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
	plugins: [solid()],
	publicDir: 'static',
	server: {
		port: 5173
	}
});
