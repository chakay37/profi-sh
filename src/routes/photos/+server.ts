import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const blob = await request.blob();

	const MUSEUM = 'http://museum-m8sc4g0kggwcwswco4c8wwoo.46.225.188.172.sslip.io:8080';

	const urlRes = await fetch(`${MUSEUM}/files/upload-urls?count=1`, {
		headers: {
			'X-Auth-Token': env.ENTE_TOKEN
		}
	});

	if (!urlRes.ok) {
		return new Response('Failed to get upload URL', { status: 500 });
	}

	const { urls } = await urlRes.json();

	const { url, objectKey } = urls[0];

	const putRes = await fetch(url, {
		method: 'PUT',
		body: blob,
		headers: { 'Content-Type': blob.type }
	});

	if (!putRes.ok) {
		return new Response('Upload failed', { status: 500 });
	}

	return new Response(JSON.stringify({ objectKey }));
};
