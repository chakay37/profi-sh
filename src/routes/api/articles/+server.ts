import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
	const res = await fetch(env.API_URL + '/articles', {
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': `${env.API_SECRET}`
		}
	});
	const data = await res.json();
	return json(data);
}
