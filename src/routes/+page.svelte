<script lang="ts">
	import './style.css';
	import logo from '$lib/main-img/logoNoText.png';
	import firstShowcase from '$lib/main-img/1.jpg';
	import secondShowcase from '$lib/main-img/2.jpg';
	import thirdShowcase from '$lib/main-img/3.jpg';
	import staticImage from '$lib/main-img/4.jpg';
	import linkIcon from '$lib/main-img/link-icon.png';
	import facebookIcon from '$lib/main-img/facebook.svg';
	import instagramIcon from '$lib/main-img/instagram.svg';

	let citiesArr: string[] = [
		'Děčín - Plzeňská',
		'Děčín - Průtah',
		'Liberec',
		'Mladá Boleslav',
		'Most',
		'Pardubice',
		'Písek',
		'Plzeň',
		'Praha 8 - Ládví',
		'Tábor',
		'Teplice',
		'Ústí nad Labem'
	];
</script>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Profi Second Hand</title>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
			crossorigin="anonymous"
		/>
	</head>
	<body>
		<header>
			<img src={logo} alt="logo" />

			<nav class="navbar navbar-expand-lg bg-body-tertiary">
				<div class="container-fluid">
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon" />
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item">
								<a class="nav-link" href="#">Kde nás najdete</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">E-shop</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Blog</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Napište nám</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Kontakty</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#"><img class="facebook" src={facebookIcon} alt="" /></a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#"><img class="instagram" src={instagramIcon} alt="" /></a
								>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
		<main>
			<div class="content">
				<section class="title-sect">
					<div class="title">
						<h1>Profi Second Hand</h1>
					</div>
					<div class="carousel-container">
						<div
							id="carouselExampleInterval"
							class="carousel slide carousel-fade"
							data-bs-ride="carousel"
						>
							<div class="carousel-inner">
								<div class="carousel-item active" data-bs-interval="4000">
									<img
										src={firstShowcase}
										class="d-block w-100 img-responsive"
										alt="obrázek oblečení"
									/>
								</div>
								<div class="carousel-item" data-bs-interval="4000">
									<img
										src={secondShowcase}
										class="d-block w-100 img-responsive"
										alt="obrázek oblečení"
									/>
								</div>
								<div class="carousel-item" data-bs-interval="4000">
									<img
										src={thirdShowcase}
										class="d-block w-100 img-responsive"
										alt="obrázek oblečení"
									/>
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
				</section>
				<section class="deals-sect">
					<div class="sect-title">
						<h2><strong>Nové akce</strong></h2>
					</div>
					<div class="table-container">
						<table class="table table-striped table-hover">
							<thead>
								<tr>
									<th scope="col" />
									<th scope="col">Dnes</th>
									<th scope="col">Zítra</th>
									<th scope="col">So 26.8.</th>
									<th scope="col">Ne 27.8.</th>
									<th scope="col">Po 28.8.</th>
									<th scope="col">Út 29.8.</th>
									<th scope="col">St 30.8.</th>
									<th scope="col">Čt 1.9.</th>
								</tr>
							</thead>
							<tbody>
								{#each citiesArr as city}
									<tr>
										<th scope="row">{city}</th>
										<td
											><div class="table-item">
												<p>-30%</p>
												<a href="">Zjistit více <img src={linkIcon} alt="Odkaz na akci" /></a>
											</div></td
										>
										<td />
										<td />
										<td />
										<td />
										<td />
										<td />
										<td />
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</section>
				<section class="about-sect" />
			</div>
		</main>
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
			crossorigin="anonymous"
		></script>
	</body>
</html>
