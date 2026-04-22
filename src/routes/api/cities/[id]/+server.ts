import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ params }) {
	const res = await fetch(`${env.API_URL}/cities/${params.id}`);
	return json(await res.json());
}
