const LINK = 'https://5gkaf9hvg6.execute-api.us-east-1.amazonaws.com/';
export async function get(table: string)
{
	const response = await fetch(LINK + table)
	const obj = await response.json();
	return obj;
} 
export async function postObj(table: string, body: object) 
{
	const response = await fetch(LINK + table, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const content = await response.json();
}
export async function postString(table: string, body: string) 
{
	const response = await fetch(LINK + table, {
    method: 'POST',
    headers: {
      'Accept': 'application/text',
      'Content-Type': 'application/text'
    },
    body: body
  });
  const content = await response.json();
}