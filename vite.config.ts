import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	preview: {
		host: true,
		port: process.env.PORT,
		allowedHosts: [
			'igs8c0w4cwocgwggs8w8o4sc.46.225.188.172.sslip.io',
			'profi-sh.cz',
			'www.profi-sh.cz'
		]
	}
});
