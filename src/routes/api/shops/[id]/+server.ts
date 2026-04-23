import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ params }) {
	const res = await fetch(`${env.API_URL}/shops/${params.id}`, {
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': `${env.API_SECRET}`
		}
	});
	return json(await res.json());
}
