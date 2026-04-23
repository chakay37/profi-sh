import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
	const res = await fetch(`${env.API_URL}/deals/${params.id}`, {
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': `Bearer ${env.API_SECRET}`
		}
	});
	return json(await res.json());
}

export async function PUT({ params, request }) {
	const body = await request.json();

	const res = await fetch(`${env.API_URL}/deals/${params.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': `Bearer ${env.API_SECRET}`
		},
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

export async function DELETE({ params }) {
	const res = await fetch(`${env.API_URL}/deals/${params.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': `Bearer ${env.API_SECRET}`
		}
	});

	return json(await res.json());
}
