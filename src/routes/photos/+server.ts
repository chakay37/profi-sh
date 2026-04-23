import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

export const GET: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name');
	const endpoint = env.MINIO_ENDPOINT;
	const bucket = env.MINIO_BUCKET;
	const accessKey = env.MINIO_ACCESS_KEY;
	const secretKey = env.MINIO_SECRET_KEY;
	const objectKey = `uploads/${name}`;

	const fileUrl = new URL(`/${bucket}/${objectKey}`, endpoint);
	const host = fileUrl.host;
	const datetime = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
	const date = datetime.slice(0, 8);
	const scope = `${date}/us-east-1/s3/aws4_request`;

	fileUrl.searchParams.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
	fileUrl.searchParams.set('X-Amz-Credential', `${accessKey}/${scope}`);
	fileUrl.searchParams.set('X-Amz-Date', datetime);
	fileUrl.searchParams.set('X-Amz-Expires', '300');
	fileUrl.searchParams.set('X-Amz-SignedHeaders', 'host');

	const canonical = [
		'GET',
		`/${bucket}/${objectKey}`,
		fileUrl.searchParams.toString(),
		`host:${host}\n`,
		'host',
		'UNSIGNED-PAYLOAD'
	].join('\n');

	const hmac = (key: Buffer | string, data: string) =>
		crypto.createHmac('sha256', key).update(data).digest();

	const signingKey = hmac(
		hmac(hmac(hmac(`AWS4${secretKey}`, date), 'us-east-1'), 's3'),
		'aws4_request'
	);
	const signature = crypto
		.createHmac('sha256', signingKey)
		.update(
			[
				'AWS4-HMAC-SHA256',
				datetime,
				scope,
				crypto.createHash('sha256').update(canonical).digest('hex')
			].join('\n')
		)
		.digest('hex');

	fileUrl.searchParams.set('X-Amz-Signature', signature);

	//console.log('Fetching:', fileUrl.toString());
	const res = await fetch(fileUrl.toString());
	//console.log('MinIO status:', res.status);
	//console.log('MinIO content-type:', res.headers.get('Content-Type'));
	const buffer = await res.arrayBuffer();
	//console.log('Buffer size:', buffer.byteLength);
	return new Response(buffer, {
		headers: {
			'Content-Type': res.headers.get('Content-Type') ?? 'image/jpeg'
		}
	});
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const auth = cookies.get('adminLogin');
	if (auth !== env.ADMIN_PASSWORD) {
		return new Response('Unauthorized', { status: 401 });
	}

	const formData = await request.formData();
	const blob = formData.get('file') as Blob;
	const name = formData.get('name') as string;

	const objectKey = `uploads/${name}.jpg`;

	const endpoint = env.MINIO_ENDPOINT; // https://minio-xxx.sslip.io
	const bucket = env.MINIO_BUCKET; // b2-eu-cen
	const accessKey = env.MINIO_ACCESS_KEY;
	const secretKey = env.MINIO_SECRET_KEY;
	const contentType = blob.type || 'application/octet-stream';

	const url = new URL(`/${bucket}/${objectKey}`, endpoint);
	const host = url.host;
	const datetime = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
	const date = datetime.slice(0, 8);

	const scope = `${date}/us-east-1/s3/aws4_request`;
	url.searchParams.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
	url.searchParams.set('X-Amz-Credential', `${accessKey}/${scope}`);
	url.searchParams.set('X-Amz-Date', datetime);
	url.searchParams.set('X-Amz-Expires', '300');
	url.searchParams.set('X-Amz-SignedHeaders', 'content-type;host');

	const canonical = [
		'PUT',
		`/${bucket}/${objectKey}`,
		url.searchParams.toString(),
		`content-type:${contentType}\nhost:${host}\n`,
		'content-type;host',
		'UNSIGNED-PAYLOAD'
	].join('\n');

	const hmac = (key: Buffer | string, data: string) =>
		crypto.createHmac('sha256', key).update(data).digest();

	const signingKey = hmac(
		hmac(hmac(hmac(`AWS4${secretKey}`, date), 'us-east-1'), 's3'),
		'aws4_request'
	);
	const signature = crypto
		.createHmac('sha256', signingKey)
		.update(
			[
				'AWS4-HMAC-SHA256',
				datetime,
				scope,
				crypto.createHash('sha256').update(canonical).digest('hex')
			].join('\n')
		)
		.digest('hex');

	url.searchParams.set('X-Amz-Signature', signature);

	const putRes = await fetch(url.toString(), {
		method: 'PUT',
		body: blob,
		headers: { 'Content-Type': contentType }
	});

	if (!putRes.ok) throw new Error(`MinIO upload failed: ${await putRes.text()}`);

	return new Response(JSON.stringify({ objectKey }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
