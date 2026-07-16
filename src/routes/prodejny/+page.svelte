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
	];
	let orderedPhotos = [];
	let photos = [];
	onMount(async () => {
		let shopsReq = await get('shops');
		photos = await get('photos');

		shops = shopsReq.sort((a, b) => a.name.localeCompare(b.name, 'cs'));

		for (let i = 0; i < shopPhotosNames.length; i++) {
			const response = await fetch('/photos?name=' + shopPhotosNames[i] + '.jpg');
			const blob = await response.blob();

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
			<a href="/prodejny/{shop.id}_{shop.urlname}" class="card">
				<div class="img-container">
					<img src={shop.photoURL} alt="Obrázek prodejny" />
					<div class="gradient"></div>
				</div>
				<div class="text">
					<h3>{shop.name}</h3>
				</div>
			</a>
		{/each}
	</section>
</div>
