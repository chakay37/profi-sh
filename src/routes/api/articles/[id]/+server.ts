import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const res = await fetch(`${process.env.API_URL}/articles/${params.id}`);
	return json(await res.json());
}
