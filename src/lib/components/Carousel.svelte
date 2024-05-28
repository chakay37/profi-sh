<script lang="ts">
	import { get } from '$lib/db';
	import { onMount } from 'svelte';
	import './carousel-bs.css';

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
<body style="border-radius: 10px;">
	{#if photosFiltered.length > 4}
		<div class="carousel-container">
			<div
				id="carouselExampleInterval"
				class="carousel slide carousel-fade"
				data-bs-ride="carousel"
			>
				<div class="carousel-inner">
					{#each photosFiltered as photo}
						<a href={photo.url} target="_blank">
							{#if (photo.name = '1')}
								<div class="carousel-item active" data-bs-interval="4000">
									<img
										src={photo.photoURL}
										class="d-block w-100 img-fluid"
										alt="obrázek oblečení"
									/>
									{#if photo.desc !== undefined && photo.desc !== ''}
										<div class="carousel-caption d-none d-md-block">
											<p>
												{photo.desc}
											</p>
										</div>
									{/if}
								</div>
							{:else}
								<div class="carousel-item" data-bs-interval="4000">
									<img
										src={photo.photoURL}
										class="d-block w-100 img-fluid"
										alt="obrázek oblečení"
									/>
									{#if photo.desc !== undefined && photo.desc !== '' && photo.desc !== null}
										<div class="carousel-caption d-none d-md-block">
											<p>
												{photo.desc}
											</p>
										</div>
									{/if}
								</div>
							{/if}
						</a>
					{/each}
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleInterval"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true" />
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleInterval"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true" />
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		</div>
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
			crossorigin="anonymous"
		></script>
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
		div {
			height: 100%;
		}
		.carousel-item {
			width: 100%;
		}
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			border: black 2px solid;
			border-radius: 10px;
			box-sizing: border-box;
		}
		button {
			opacity: 1;
		}
		.carousel-control-prev-icon {
			background-color: $logo-color-dark;
			border-radius: 4px;
		}
		.carousel-control-next-icon {
			background-color: $logo-color-dark;
			border-radius: 4px;
		}
	}
	@media (max-width: 1400px) {
		.carousel-container {
			width: 100%;
			height: 200px;
			div {
				height: 100%;
			}
			img {
				height: 100%;
			}
		}
	}
	@media (min-width: 800px) {
		.carousel-container {
			width: 100%;
			height: 350px;
			div {
				height: 100%;
			}
			img {
				height: 100%;
			}
		}
	}
</style>
