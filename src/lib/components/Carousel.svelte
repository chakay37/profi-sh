<script lang="ts">
	import firstShowcase from '$lib/main-img/1.jpg';
	import secondShowcase from '$lib/main-img/2.jpg';
	import thirdShowcase from '$lib/main-img/3.jpg';
	import './carousel-bs.css';
</script>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="border-radius: 10px;">
	<div class="carousel-container">
		<div id="carouselExampleInterval" class="carousel slide carousel-fade" data-bs-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active" data-bs-interval="4000">
					<img src={firstShowcase} class="d-block w-100 img-fluid" alt="obrázek oblečení" />
					<div class="carousel-caption d-none d-md-block">
						<p>
							Titulek např. na odkaz k prodeji. max 100 znaků. Lorem ipsum dolor sit, amet
							consectetur adipisicing elit.
						</p>
					</div>
				</div>
				<div class="carousel-item" data-bs-interval="4000">
					<img src={secondShowcase} class="d-block w-100 img-fluid" alt="obrázek oblečení" />
				</div>
				<div class="carousel-item" data-bs-interval="4000">
					<img src={thirdShowcase} class="d-block w-100 img-fluid" alt="obrázek oblečení" />
				</div>
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
</body>

<style lang="scss">
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
</style>
