<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from '$lib/db';
	import Carousel from '$lib/components/Carousel.svelte';
	import process from 'process';
	import { encode, decode } from 'js-base64';
	import { compress } from 'image-conversion';
	import './style.scss';

	let photosURL: string[] = [];
	//SF/4OVvE5KvU57QNjYz4y0IlMMx7IhhvFbFSO5WY
	const dontReadThisPls = encode('SF/4OVvE5KvU57QNjYz4y0IlMMx7IhhvFbFSO5WY');

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const file = formData.get('file') as Blob;

		// Assuming 'file' is your PNG image file
		let jpgBlob: Blob;
		await compress(file, {
			quality: 0.8,
			type: 'image/jpeg'
		}).then((res: Blob) => {
			console.log(res);
			jpgBlob = res;
		});

		AWS.config.update({
			accessKeyId: 'AKIAWQZV5LCLPYYRFKGN',
			secretAccessKey: decode(dontReadThisPls),
			region: 'us-east-1'
		});

		const s3 = new AWS.S3();

		const params = {
			Bucket: 'file-upload-sh',
			Key: 'image.jpg',
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

	onMount(async () => {
		try {
			const response = await fetch('https://file-upload-sh.s3.amazonaws.com/image.jpg');
			const blob = await response.blob();
			//let photoOut = await response.json();

			console.log(blob);
			photosURL.push(URL.createObjectURL(blob));

			photosURL = photosURL; //...
			console.log(photosURL);
		} catch (error) {
			console.error('Error loading images:', error);
		}
		//shopsArr = shops.map((shop: { [x: string]: object; }) => {return shop['name']})
	});

	let aaa: FileList;
</script>

<body>
	<section>
		<form on:submit|preventDefault={handleSubmit}>
			<label class="aaa secondary-button"
				>{#if aaa == undefined}
					Změň obrázek
				{/if}{#if aaa != undefined}Obrázek vybrán ✔️{/if}
				<input name="file" type="file" accept="image/png, image/jpeg" bind:files={aaa} />
			</label>
			<button type="submit">Upload</button>
		</form>
		{#each photosURL as photoURL}
			<p>{photoURL}</p>
			<img src={photoURL} alt="" />
		{/each}
	</section>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.1447.0/aws-sdk.min.js"></script>
</body>
