import type { Actions } from '@sveltejs/kit';

export function load({ cookies }) {
	const authenticated = cookies.get('editorLogin');
    if (authenticated === 'Bbftr89/hbf19') {
        return { authenticated: true };
    }
    return { authenticated: false };
    
}


export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();

        const password: FormDataEntryValue | null = data.get('password');
        
        if (password !== null) {
            let p = password.toString();
            if (p === "Bbftr89/hbf19") {
                cookies.set('editorLogin', 'Bbftr89/hbf19', { path: '/' });
            }
        }
        
    }
} satisfies Actions;