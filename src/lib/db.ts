const LINK = 'https://5gkaf9hvg6.execute-api.us-east-1.amazonaws.com/';
export async function get(table: string)
{
	const response = await fetch(LINK + table)
	const obj = await response.json();
	return obj;
} 
export async function getId(table: string, id: number)
{
	const response = await fetch(LINK + table + '/' + id)
	const obj = await response.json();
	return obj;
} 
export async function post(table: string, body: object) 
{
  console.log(JSON.stringify(body))
	const response = await fetch(LINK + table, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}