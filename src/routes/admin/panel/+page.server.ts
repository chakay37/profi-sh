import type { Actions } from '@sveltejs/kit';
import { Deals } from '$lib/models/models';
let deal: Deals = new Deals(0, new Date(), new Date(), 0, '', 0, '');
let photo: object = {};
import { myDBInstance } from '$lib/db';
import { env } from '$env/dynamic/private';

export function load({ setHeaders, cookies }) {
	setHeaders({
		'Pragma-directive': 'no-cache',
		'Cache-directive': 'no-cache',
		'Cache-control': 'no-cache',
		Pragma: 'no-cache',
		Expires: '0'
	});

	const authenticated = cookies.get('adminLogin');
	if (authenticated === env.ADMIN_PASSWORD) {
		return { authenticated: true };
	}
	return { authenticated: false };
}

export const actions = {
	dealPost: async ({ request, fetch }) => {
		const data = await request.formData();

		const type: FormDataEntryValue | null = data.get('type');
		const value: FormDataEntryValue | null = data.get('value');
		const shops: FormDataEntryValue[] | null = data.getAll('shops');
		const date: FormDataEntryValue | null = data.get('date');
		const enddate: FormDataEntryValue | null = data.get('enddate');
		const priority: FormDataEntryValue | null = data.get('priority');
		const text: FormDataEntryValue | null = data.get('text');

		let prioritynum = 0;
		if (priority == 'on') {
			prioritynum = 1;
		}

		if (type != null && shops != null && date != null && enddate != null && text != null) {
			deal.type = Number(type.toString());
			//deal.shopId = Number(shopId);
			console.log(date.toString());
			deal.date = date.toString();
			deal.enddate = enddate.toString();
			deal.priority = prioritynum;
			deal.text = text.toString();
			if (deal.type === 0 || deal.type === 2) {
				if (value === null) {
					return { success: false };
				}
				deal.value = value.toString();
			}
			for (let i = 0; i < shops.length; i++) {
				deal.shopId = Number(shops[i]);
				const db = myDBInstance.withFetch(fetch);
				await db.post('deals', deal);
			}

			//await post('deals', deal);
			return { success: true };
		}
		console.log(priority);
		//console.log(type);
		//console.log(date);
		//console.log(text);
		return { false: true };
	},
	dealPut: async ({ request, fetch }) => {
		const data = await request.formData();

		const id: FormDataEntryValue | null = data.get('id');
		const type: FormDataEntryValue | null = data.get('type');
		let value: FormDataEntryValue | null = data.get('value');
		const shopId: FormDataEntryValue | null = data.get('shopId');
		const date: FormDataEntryValue | null = data.get('date');
		const enddate: FormDataEntryValue | null = data.get('enddate');
		const priority: FormDataEntryValue | null = data.get('priority');
		const text: FormDataEntryValue | null = data.get('text');

		if (value == null) {
			value = '';
		}

		let prioritynum = 0;
		if (priority == 'on') {
			prioritynum = 1;
		}
		console.log(id);
		console.log(type);
		console.log(value);
		console.log(shopId);
		console.log(date);
		console.log(enddate);
		console.log(priority);
		console.log(text);

		if (
			id != null &&
			type != null &&
			value != null &&
			shopId != null &&
			date != null &&
			enddate != null &&
			text != null
		) {
			deal.id = Number(id.toString());
			deal.type = Number(type.toString());
			deal.value = value.toString();
			deal.shopId = Number(shopId);
			deal.date = date.toString();
			deal.enddate = enddate.toString();
			deal.priority = prioritynum;
			deal.text = text.toString();

			console.log(deal);
			const db = myDBInstance.withFetch(fetch);
			await db.put('deals', deal.id, deal);
			return { success: true };
		}
		//console.log(type);
		//console.log(date);

		return { false: true };
	},
	photo: async ({ request, fetch }) => {
		const data = await request.formData();

		const id: FormDataEntryValue | null = data.get('id');
		const desc: FormDataEntryValue | null = data.get('desc');
		const url: FormDataEntryValue | null = data.get('url');

		if (id != null && desc != null && url != null) {
			photo.id = Number(id.toString());
			photo.name = '';
			photo.desc = desc.toString();
			photo.url = url.toString();

			const db = myDBInstance.withFetch(fetch);
			await db.put('photos', photo.id, photo);
			return { success: true };
		}
		console.log(desc);
		console.log(url);
		return { false: true };
	}
} satisfies Actions;
