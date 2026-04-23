import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const { method } = event.request;

	const isProtected =
		(pathname.startsWith('/api/users') && method === 'GET') ||
		(pathname.startsWith('/api/photos') && method === 'PUT') ||
		(pathname.startsWith('/api/deals') && ['POST', 'PUT', 'DELETE'].includes(method)) ||
		pathname.startsWith('/admin/panel');

	if (isProtected) {
		const auth = event.cookies.get('adminLogin');
		if (auth !== env.ADMIN_PASSWORD) {
			return new Response('Unauthorized', { status: 401 });
		}
	}

	return resolve(event);
};
