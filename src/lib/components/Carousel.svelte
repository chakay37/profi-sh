<script lang="ts">
	import { get } from '$lib/db';
	import { onMount } from 'svelte';
	import Carousel from 'svelte-carousel';

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

	let carousel;
	function goToPrevPage() {
		carousel.goToPrev();
	}
	function goToNextPage() {
		carousel.goToNext();
	}
</script>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
	<div class="carousel-wrapper">
		{#if photosFiltered.length > 4}
			<div class="carousel-container">
				<Carousel bind:this={carousel} autoplay autoplayDuration={3000}>
					<div slot="prev">
						<div class="prev-container" on:click={goToPrevPage}>
							<svg
								fill="#ffffff"
								width="20px"
								height="20px"
								viewBox="0 0 32 32"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M23.505 0c0.271 0 0.549 0.107 0.757 0.316 0.417 0.417 0.417 1.098 0 1.515l-14.258 14.264 14.050 14.050c0.417 0.417 0.417 1.098 0 1.515s-1.098 0.417-1.515 0l-14.807-14.807c-0.417-0.417-0.417-1.098 0-1.515l15.015-15.022c0.208-0.208 0.486-0.316 0.757-0.316z"
								/>
							</svg>
						</div>
					</div>
					<div slot="next">
						<div class="next-container" on:click={goToNextPage}>
							<svg
								fill="#ffffff"
								width="20px"
								height="20px"
								viewBox="0 0 32 32"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"
								/>
							</svg>
						</div>
					</div>
					{#each photosFiltered as photo}
						<a href={photo.url} target="_blank">
							<div class="carousel-item">
								<img src={photo.photoURL} alt="obrázek oblečení" />
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
					<div slot="dots" />
				</Carousel>
			</div>
		{/if}
	</div>
</body>

<style lang="scss">
	$logo-color: #a7996b;
	$logo-color-dark: #8f8054;
	$logo-color-light: #b6a771;
	$white: #f1f1ee;

	.carousel-container {
		width: 290px;
		overflow-y: hidden;
		height: 300px;
		a {
			text-decoration: none;
		}
		img {
			width: 150px;
			height: 150px;
			object-fit: cover;
			border: black 2px solid;
			border-radius: 10px;
			box-sizing: border-box;
		}
		.carousel-caption {
			p {
				font-size: 16px;
			}
			border-radius: 5px;
			background-color: $logo-color-dark;
			color: $white;
		}
		.prev-container,
		.next-container {
			cursor: pointer;
			margin-top: 65px;
			margin-inline: 20px;
			padding: 5px;
			border-radius: 5px;
			background-color: $logo-color-dark;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	@media (min-width: 500px) {
		//	.carousel-container {
		//		width: 420px;
		//		height: 420px;
		//		img {
		//			width: 280px;
		//			height: 280px;
		//		}
		//
		//			.prev-container,
		//			.next-container {
		//				margin-top: 130px;
		//			}
		//		}
		//	}
		//	@media (min-width: 1400px) {
		.carousel-container {
			min-width: 550px;
			min-height: 550px;
			img {
				width: 410px;
				height: 410px;
			}

			.prev-container,
			.next-container {
				margin-top: 170px;
			}
		}
	}
</style>
