<script lang="ts">
	import { Photos } from '$lib/models/models';

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const url = 'https://5gkaf9hvg6.execute-api.us-east-1.amazonaws.com/photos';
		const formData = new FormData(e.target as HTMLFormElement);
		const fileInputs = formData.getAll('file');

		const photos = [];

		for (const fileInput of fileInputs) {
			const file = await (fileInput as File).text();
			const photo = new Photos('abc', file);
			photos.push(photo);
		}

		
		console.log(photos);

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

		//const responses = await Promise.all(promises);
	};

	import { onMount } from 'svelte';
	import { get } from '$lib/db';

	let photos: Photos[] = [];
	let photosURL: string[] = [];
	onMount(async () => {
		try {
		photos = await get('photos');
		photos.forEach((photo) => {

		const blob = new Blob([photo.file], { type: "text/plain" });
		//console.log(blob as File)
	 	photosURL.push(URL.createObjectURL(blob));
		})
		console.log(photos);
		//console.log(photosURL);
		}catch (error) {
    console.error("Error loading images:", error);
  }
		//shopsArr = shops.map((shop: { [x: string]: object; }) => {return shop['name']})
	});
	
</script>

<section>
	<form on:submit|preventDefault={handleSubmit}>
		<input name="file" type="file" accept="image/png, image/jpeg" multiple />
		<button type="submit">Upload</button>
	</form>
	{#each photosURL as photoURL}
		<img src={photoURL} alt="">
	{/each}
</section>
