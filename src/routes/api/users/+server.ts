import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export async function GET() {
	const res = await fetch(env.API_URL + '/users');
	return json(await res.json());
}

export async function POST({ request }) {
	const body = await request.json();
	const res = await fetch(env.API_URL + '/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	const text = await res.text();
	console.log('Raw response:', text);

	try {
		const data = JSON.parse(text);
		return json(data);
	} catch (e) {
		console.log('Not valid JSON:', text);
		throw error(res.status, text);
	}
}
