import type { Actions } from '@sveltejs/kit';

export function load({ cookies }) {
	const authenticated = cookies.get('adminLogin');
    if (authenticated === 'W7CtMKGegq5R6D') {
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
            if (p === "W7CtMKGegq5R6D") {
                cookies.set('adminLogin', 'W7CtMKGegq5R6D', { path: '/' });
            }
        }
        
    }
} satisfies Actions;