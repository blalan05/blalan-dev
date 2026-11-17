import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';
import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
	plugins: [
		solid({ ssr: false }),
		VitePluginRadar({
			gtm: [{ id: 'GTM-KDJL3JV7' }]
		})
	],
	publicDir: 'static',
	server: {
		port: 5173
	}
});
