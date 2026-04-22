import type { Actions } from '@sveltejs/kit';
import { Users } from '$lib/models/models';
import { error } from '@sveltejs/kit';
let user: Users = new Users('', '', 0);
import { myDBInstance } from '$lib/db';
import { json } from '@sveltejs/kit';

export const ssr = true;

export const actions = {
	user: async ({ request, fetch }) => {
		const data = await request.formData();

		try {
			const email: FormDataEntryValue | null = data.get('email');
			const phone: FormDataEntryValue | null = data.get('phone');
			const cityid: FormDataEntryValue | null = data.get('cityid');

			if (email !== null && phone !== null && cityid !== null) {
				user.email = email.toString();
				user.phone = phone.toString();
				user.cityid = Number(cityid.toString());
				user.date_registered = new Date();

				const db = myDBInstance.withFetch(fetch);
				await db.post('users', user);
				return {
					success: true,
					user: { ...user }
				};
			}
			throw error(400, 'Missing required fields');
		} catch (err) {
			console.log(err);
			throw error(500, 'Failed to create user');
		}
	}
} satisfies Actions;
