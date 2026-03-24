import { json } from '@sveltejs/kit';

export async function GET() {
	return await fetch('http://localhost:3000/deals');
}
