import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		const auth = event.cookies.get('adminLogin');
		if (auth !== env.ADMIN_PASSWORD) {
			return new Response('Unauthorized', { status: 401 });
		}
	}
	return resolve(event);
};
