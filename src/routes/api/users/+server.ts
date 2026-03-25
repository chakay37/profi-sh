import { json } from '@sveltejs/kit';

export async function GET() {
	const res = await fetch(process.env.API_URL + '/users');
	return json(await res.json());
}

export async function POST({ request }) {
	const body = await request.json();

	const res = await fetch(process.env.API_URL + '/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	return json(await res.json());
}
