<script lang="ts" context="module">
	import { encode, decode } from 'js-base64';
	import { compress } from 'image-conversion';

	const umm = encode('+F5OQwz5l5bmEB2RJfWHduNrbtD1T5z3jK1b3zNX');

	export const handleSubmit = async (e: SubmitEvent, fileName: string) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const file = formData.get('file') as Blob;

		// Assuming 'file' is your PNG image file
		let jpgBlob: Blob;
		await compress(file, {
			quality: 0.8,
			type: 'image/jpeg'
		}).then((res: Blob) => {
			jpgBlob = res;
		});


		AWS.config.update({
			accessKeyId: 'AKIAWQZV5LCLIUB6VGQW',
			secretAccessKey: decode(umm),
			region: 'us-east-1'
		});

		const s3 = new AWS.S3();

		const params = {
			Bucket: 'file-upload-sh',
			Key: fileName + '.jpg',
			Body: jpgBlob
		};

		s3.upload(params, (err, data) => {
			if (err) {
				console.error('Error uploading file:', err);
			} else {
				console.log('File uploaded successfully. S3 URL:', data.Location);
			}
		});
		/*const url = 'https://5gkaf9hvg6.execute-api.us-east-1.amazonaws.com/photos';
    const formData = new FormData(e.target as HTMLFormElement);

    const fileInputs = formData.getAll('file');

    let photos = [];

    for (const fileInput of fileInputs) {
        const file = await (fileInput as File).text();
        const photo = new Photos('abc', file);
        photos.push(photo);
    }

    const promises = photos.map(async (photo) => {
        const image = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(photo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return image;
    });

    const responses = await Promise.all(promises);*/
	};
</script>
<body>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.1447.0/aws-sdk.min.js"></script>
</body>