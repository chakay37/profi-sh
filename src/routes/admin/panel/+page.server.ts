import type { Actions } from '@sveltejs/kit';
import { Deals } from '$lib/models/models';
let deal: Deals = new Deals(0, new Date(), new Date(), 0, '', 0, '');
let photo: object = {};
import { get, post, put } from '$lib/db';

export const actions = {
    dealPost: async ({ request }) => {
        const data = await request.formData();

        const type: FormDataEntryValue | null = data.get('type');
        const value: FormDataEntryValue | null = data.get('value');
        const shopId: FormDataEntryValue | null = data.get('shopId');
        const date: FormDataEntryValue | null = data.get('date');
        const enddate: FormDataEntryValue | null = data.get('enddate');
        const text: FormDataEntryValue | null = data.get('text');
        
        if (type != null && shopId != null && date != null && enddate != null && text != null) {
            deal.type = Number(type.toString());
            deal.shopId = Number(shopId);
            deal.date = new Date(date.toString());
            deal.enddate = new Date(enddate.toString());
            deal.text = text.toString();
            if (deal.type === 0 || deal.type === 2) {
                if (value === null) {
                    return { success: false };
                }
                deal.value = value.toString();
            }
            

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

        const id: FormDataEntryValue | null = data.get('id');
        const type: FormDataEntryValue | null = data.get('type');
        const value: FormDataEntryValue | null = data.get('value');
        const shopId: FormDataEntryValue | null = data.get('shopId');
        const date: FormDataEntryValue | null = data.get('date');
        const enddate: FormDataEntryValue | null = data.get('enddate');
        const text: FormDataEntryValue | null = data.get('text');
        
        if (id != null && type != null && value != null && shopId != null && date != null && enddate != null && text != null) {
            deal.id = Number(id.toString())
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
        
    },
    photo: async ({ request }) => {
        const data = await request.formData();

        const desc: FormDataEntryValue | null = data.get('desc');
        const url: FormDataEntryValue | null = data.get('url');
        
        
        if (desc != null && url != null) {
            photo.desc = desc;
            photo.url = url;
            
            await post('photos', photo);
            return { success: true };
        }
        console.log(desc)
        console.log(url)
        return { false: true };
        
    },
    
} satisfies Actions;

