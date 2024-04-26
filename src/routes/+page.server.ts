import type { Actions } from '@sveltejs/kit';
import { Users } from '$lib/models/models';
let user: Users = new Users('', '', 0);
import { get, post } from '$lib/db';


export const ssr = true;

export const actions = {
    user: async ({ request }) => {
        const data = await request.formData();

        const email: FormDataEntryValue | null = data.get('email');
        const phone: FormDataEntryValue | null = data.get('phone');
        const cityId: FormDataEntryValue | null = data.get('cityId');
        
        if (email !== null && phone !== null && cityId !== null) {
            user.email = email.toString();
            user.phone = phone.toString();
            user.cityId = Number(cityId.toString());

            await post('users', user);
            return { success: true };
        }
        return { false: true };
        
    }
} satisfies Actions;