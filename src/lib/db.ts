const LINK = 'http://localhost:3000/';

export const myDBInstance = {
	get: async function (table: string) {
		const response = await fetch(LINK + table);
		return await response.json();
	},
	getId: async function (table: string, id: number) {
		const response = await fetch(LINK + table + '/' + id);
		return await response.json();
	},
	post: async function (table: string, body: object) {
		await fetch(LINK + table, {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
	},
	put: async function (table: string, body: object) {
		await fetch(LINK + table, {
			method: 'PUT',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
	},
	del: async function (table: string, id: number) {
		await fetch(LINK + table + '/' + id, { method: 'DELETE' });
	}
};

export async function get(table: string) {
	return await myDBInstance.get(table);
}
export async function getId(table: string, id: number) {
	return await myDBInstance.getId(table, id);
}
export async function post(table: string, body: object) {
	return await myDBInstance.post(table, body);
}
export async function put(table: string, body: object) {
	return await myDBInstance.put(table, body);
}
export async function del(table: string, id: number) {
	return await myDBInstance.del(table, id);
}
