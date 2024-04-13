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
export async function put(table: string, body: object) 
{
  console.log(JSON.stringify(body))
	const response = await fetch(LINK + table, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}
export async function del(table: string, id: number) 
{
	const response = await fetch(LINK + table + '/' + id, {
    method: 'DELETE',
  });
}

import process from "process";

process.on('exit', (code) => end_db_pool(pool));
process.on('SIGINT', () => end_db_pool(pool));

function end_db_pool(pool: any) {
	pool.getConnection(function (err, connection) {
		connection.query('select 1 from my_table;', function (err, rows) {
			connection.release();
			// pool.end() only works inside getConnection();
			pool.end((err) => {
				if (err) log('pool.end err: ' + err);
			});
		});
	});
}
