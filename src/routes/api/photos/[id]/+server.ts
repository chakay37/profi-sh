import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const res = await fetch(`${process.env.API_URL}/photos/${params.id}`);
	return json(await res.json());
}

export async function PUT({ params, request }) {
	const body = await request.json();

	const res = await fetch(`${process.env.API_URL}/photos/${params.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	return json(await res.json());
}
