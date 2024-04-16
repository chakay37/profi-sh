import type { Actions } from '@sveltejs/kit';
let article: object = {};
import { get, post, put } from '$lib/db';

export function load({ setHeaders, cookies }) {
    const authenticated = cookies.get('editorLogin');
    if (authenticated === 'Bbftr89/hbf19') {
        return { authenticated: true };
    }
    return { authenticated: false };
}

export const actions = {
    articlePost: async ({ request }) => {
        const data = await request.formData();

        const name: FormDataEntryValue | null = data.get('name');
        const text: FormDataEntryValue | null = data.get('text');
        
        if (name != null && text != null) {
            article.name = name.toString();
            article.text = text.toString();
            article.date = new Date();

            await post('articles', article);
            return { success: true };
        }

        return { false: true };
        
    },
    articlePut: async ({ request }) => {
        const data = await request.formData();

        const id: FormDataEntryValue | null = data.get('id');
        const name: FormDataEntryValue | null = data.get('name');
        const text: FormDataEntryValue | null = data.get('text');
        
        if (name != null && text != null && id != null) {
            article.id = Number(id.toString());
            article.name = name.toString();
            article.text = text.toString();
            article.date = new Date();

            await put('articles', article);
            return { success: true };
        }

        console.log("error");
        return { false: true };
        
    },
    
    
} satisfies Actions;

