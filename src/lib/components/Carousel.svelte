<script lang="ts">
	import { get } from '$lib/db';
	import { onMount } from 'svelte';
	import Carousel from 'svelte-carousel'

	async function getFilteredPhotos(photos) {
		for (let i = 1; i < 6; i++) {
			let response;
			//if (i == 1) {
			response = await fetch('https://file-upload-sh.s3.amazonaws.com/' + i + '.jpg');
			/*} else {
				response = await fetch('https://file-upload-sh.s3.amazonaws.com/' + i + '.jpg?v=' + Math.random()*1000);
			}*/

			const blob = await response.blob();
			//let photoOut = await response.json();

			//photosURL.push(URL.createObjectURL(blob));
			let photo = photos.filter((a) => a.name === i.toString())[0];

			photo.photoURL = URL.createObjectURL(blob);
			photosFiltered.push(photo);

		}
		return photosFiltered;
	}
	let photos = [];
	let photosFiltered: object[] = [];
	onMount(async () => {
		photos = await get('photos');
		photosFiltered = await getFilteredPhotos(photos);
	});
</script>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
	{#if photosFiltered.length > 4}
		<div class="carousel-container">
		<Carousel
			autoplay
			autoplayDuration={3000}
		>
			{#each photosFiltered as photo}
				<a href={photo.url} target="_blank">
						<div class="carousel-item">
							<img
								src={photo.photoURL}
								alt="obrázek oblečení"
							/>
							{#if photo.desc !== undefined && photo.desc !== '' && photo.desc !== null}
								<div class="carousel-caption">
									<p>
										{photo.desc}
									</p>
								</div>

							{/if}

						</div>
				</a>
			{/each}
		</Carousel>
		</div>
	{/if}
</body>

<style lang="scss">
	$logo-color: #a7996b;
	$logo-color-dark: #8f8054;
	$logo-color-light: #b6a771;
	$white: #f1f1ee;

	.carousel-container {
		width: 100%;
		overflow-y: hidden;
		height: 400px;
		a {
      text-decoration: none;
    }
		img {
			width: 100%;
			height: 350px;
			object-fit: cover;
			border: black 2px solid;
			border-radius: 10px;
			box-sizing: border-box;
		}
		.carousel-caption {
			background-color: $logo-color-dark;
			color: $white;
		}
	}
	@media (max-width: 1400px) {
		.carousel-container {
			width: 100%;
			height: 200px;
			img {
				height: 150px;
			}
		}
	}
	@media (min-width: 800px) {
		.carousel-container {
			width: 100%;
			height: 350px;
      img {
        height: 300px;
      }
		}
	}
</style>
