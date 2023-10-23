export async function get(table: string)
	{
		let response = await fetch('https://5gkaf9hvg6.execute-api.us-east-1.amazonaws.com/' + table)
		let obj = await response.json();
		return obj;
	} 