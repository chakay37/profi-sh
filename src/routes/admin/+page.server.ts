import type { Actions } from '@sveltejs/kit';
import { Deals } from '$lib/models/models';
let deal: Deals = new Deals(new Date(), new Date(), 0, '', 0, '');
import { get, post } from '$lib/db';

export const actions = {
    dealPost: async ({ request }) => {
        const data = await request.formData();

        const type: FormDataEntryValue | null = data.get('type');
        const value: FormDataEntryValue | null = data.get('value');
        const shopId: FormDataEntryValue | null = data.get('shopId');
        const date: FormDataEntryValue | null = data.get('date');
        const enddate: FormDataEntryValue | null = data.get('enddate');
        const text: FormDataEntryValue | null = data.get('text');
        
        if (type !== null && value !== null && shopId !== null && date !== null && enddate !== null && text !== null) {
            deal.type = Number(type.toString());
            deal.value = value.toString();
            deal.shopId = Number(shopId);
            deal.date = new Date(date.toString());
            deal.enddate = new Date(enddate.toString());
            deal.text = text.toString();

            await post('deals', deal);
            return { success: true };
        }
        console.log(type)
        console.log(date)
        console.log(text)
        return { false: true };
        
    },
    dealPut: async ({ request }) => {
        const data = await request.formData();

        const type: FormDataEntryValue | null = data.get('type');
        const value: FormDataEntryValue | null = data.get('value');
        const shopId: FormDataEntryValue | null = data.get('shopId');
        const date: FormDataEntryValue | null = data.get('date');
        const enddate: FormDataEntryValue | null = data.get('enddate');
        const text: FormDataEntryValue | null = data.get('text');
        
        if (type !== null && value !== null && shopId !== null && date !== null && enddate !== null && text !== null) {
            deal.type = Number(type.toString());
            deal.value = value.toString();
            deal.shopId = Number(shopId);
            deal.date = new Date(date.toString());
            deal.enddate = new Date(enddate.toString());
            deal.text = text.toString();

            await put('deals', deal);
            return { success: true };
        }
        console.log(type)
        console.log(date)
        console.log(text)
        return { false: true };
        
    }
} satisfies Actions;