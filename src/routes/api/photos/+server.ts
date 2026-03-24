import { json } from '@sveltejs/kit';

export async function GET() {
	const res = await fetch(process.env.API_URL + '/photos');
	const data = await res.json();
	return json(data);
}
