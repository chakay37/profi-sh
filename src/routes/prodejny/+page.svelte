<script lang="ts">
	import './prodejny.scss';
	import { onMount } from 'svelte';
	import { get } from '$lib/db';

	let shops: object[] = [];
	const shopPhotosNames = [
		'decinPlzenska',
		'decinPrutah',
		'mladaBoleslav',
		'most',
		'pardubice',
		'pisek',
		'praha',
		'tabor',
		'teplice',
		'ustiNadLabem',
		'plzen'
	];
	let orderedPhotos = [];
	let photos = [];
	onMount(async () => {
		shops = await get('shops');
		photos = await get('photos');

		for (let i = 0; i < shopPhotosNames.length; i++) {
			const response = await fetch(
				'https://file-upload-sh.s3.amazonaws.com/' + shopPhotosNames[i] + '.jpg'
			);
			const blob = await response.blob();
			//let photoOut = await response.json();

			//photosURL.push(URL.createObjectURL(blob));
			console.log(photos);
			console.log(shopPhotosNames[i]);
			let photo = photos.filter((a) => a.name === shopPhotosNames[i].toString())[0];
			photo.photoURL = URL.createObjectURL(blob);
			orderedPhotos.push(photo);
		}

		for (let i = 0; i < shops.length; i++) {
			shops[i].photoURL = orderedPhotos[i].photoURL;
		}
	});
</script>

<div class="prodejny-page">
	<section>
		{#each shops as shop}
			<a href="/prodejny/{shop.id}" class="card">
				<div class="img-container">
					<img src={shop.photoURL} alt="Obrázek prodejny" />
					<div class="gradient" />
				</div>
				<div class="text">
					<h3>{shop.name}</h3>
				</div>
			</a>
		{/each}
	</section>
</div>
