import { browser } from '$app/environment';

const LINK = '/api/';

function resolveFetch(customFetch?: typeof fetch) {
	if (customFetch) return customFetch;

	if (browser) return fetch;

	throw new Error('Server usage requires event.fetch → use myDBInstance.withFetch(event.fetch)');
}

function createInstance(customFetch?: typeof fetch) {
	const f = resolveFetch(customFetch);

	return {
		async get(table: string) {
			const response = await f(LINK + table);
			return response.json();
		},

		async getId(table: string, id: number) {
			const response = await f(`${LINK}${table}/${id}`);
			return response.json();
		},

		async post(table: string, body: object) {
			const response = await f(LINK + table, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			return response.json();
		},

		async put(table: string, id: number, body: object) {
			const response = await f(`${LINK}${table}/${id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			return response.json();
		},

		async del(table: string, id: number) {
			await f(`${LINK}${table}/${id}`, {
				method: 'DELETE'
			});
		}
	};
}

export const myDBInstance = {
	withFetch(fetch: typeof globalThis.fetch) {
		return createInstance(fetch);
	},

	get(table: string) {
		return createInstance().get(table);
	},

	getId(table: string, id: number) {
		return createInstance().getId(table, id);
	},

	post(table: string, body: object) {
		return createInstance().post(table, body);
	},

	put(table: string, id: number, body: object) {
		return createInstance().put(table, id, body);
	},

	del(table: string, id: number) {
		return createInstance().del(table, id);
	}
};

/* THEN export helpers */

export const get = myDBInstance.get;
export const getId = myDBInstance.getId;
export const post = myDBInstance.post;
export const put = myDBInstance.put;
export const del = myDBInstance.del;
