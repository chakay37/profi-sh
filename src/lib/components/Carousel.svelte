<script lang="ts">
	import { get } from '$lib/db';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let photos: object[] = [];
	let photosFiltered: any[] = [];
	let current = 0;

	async function getFilteredPhotos(photos: any[]) {
		const result = [];
		for (let i = 1; i < 6; i++) {
			const response = await fetch('https://file-upload-sh.s3.amazonaws.com/' + i + '.jpg');
			const blob = await response.blob();
			const photo = photos.filter((a) => a.name === i.toString())[0];
			photo.photoURL = URL.createObjectURL(blob);
			result.push(photo);
		}
		return result;
	}

	onMount(async () => {
		photos = await get('photos');
		photosFiltered = await getFilteredPhotos(photos);
		startAutoplay();
	});

	function prev() {
		current = (current - 1 + photosFiltered.length) % photosFiltered.length;
	}

	function next() {
		current = (current + 1) % photosFiltered.length;
	}

	let interval: ReturnType<typeof setInterval>;
	function startAutoplay() {
		interval = setInterval(next, 100000);
	}
</script>

{#if browser}
	<div class="carousel-wrapper">
		{#if photosFiltered.length > 4}
			<div class="carousel-container">
				<button class="prev-container" on:click={prev} aria-label="Previous">
					<svg
						fill="#ffffff"
						width="20px"
						height="20px"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M23.505 0c0.271 0 0.549 0.107 0.757 0.316 0.417 0.417 0.417 1.098 0 1.515l-14.258 14.264 14.050 14.050c0.417 0.417 0.417 1.098 0 1.515s-1.098 0.417-1.515 0l-14.807-14.807c-0.417-0.417-0.417-1.098 0-1.515l15.015-15.022c0.208-0.208 0.486-0.316 0.757-0.316z"
						/>
					</svg>
				</button>

				{#key current}
					<a href={photosFiltered[current]?.url} target="_blank">
						<div class="carousel-item">
							<img src={photosFiltered[current]?.photoURL} alt="obrázek oblečení" />
							{#if photosFiltered[current]?.desc}
								<div class="carousel-caption"><p>{photosFiltered[current].desc}</p></div>
							{/if}
						</div>
					</a>
				{/key}

				<button class="next-container" on:click={next} aria-label="Next">
					<svg
						fill="#ffffff"
						width="20px"
						height="20px"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"
						/>
					</svg>
				</button>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	$logo-color-dark: #8f8054;
	$white: #f1f1ee;

	.carousel-container {
		width: 290px;
		height: 300px;
		overflow-y: hidden;
		display: flex;
		align-items: center;

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
			flex-shrink: 0;
			padding: 5px;
			border: none;
			border-radius: 5px;
			background-color: $logo-color-dark;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media (min-width: 500px) {
		.carousel-container {
			min-width: 550px;
			min-height: 550px;

			.carousel-item {
				max-width: 410px;
				img {
					width: 410px;
					height: 410px;
				}
			}
		}
	}
</style>
