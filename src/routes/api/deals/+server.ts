import { json } from '@sveltejs/kit';

export async function GET() {
	const res = await fetch('http://localhost:3000/deals');
	const data = await res.json();
	return json(data);
}
