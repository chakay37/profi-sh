<script lang="ts">
	import './style.css';
	import logo from '$lib/main-img/logo.png';
	import firstShowcase from '$lib/main-img/1.jpg';
	import secondShowcase from '$lib/main-img/2.jpg';
	import thirdShowcase from '$lib/main-img/3.jpg';
	import staticImage from '$lib/main-img/4.jpg';
	/*const staticImage = new URL(
		'https://cdn.atomix.vg/wp-content/uploads/2015/07/super-mario-maker-facebook.jpg'
	);*/
	import linkIcon from '$lib/main-img/link-icon.png';
	import facebookIcon from '$lib/main-img/facebook.svg';
	import instagramIcon from '$lib/main-img/instagram.svg';
	import branch1 from '$lib/main-img/branch1.svg';
	import branch2 from '$lib/main-img/branch2.svg';
	import branch3 from '$lib/main-img/branch3.svg';
	import fb1 from '$lib/main-img/fb1.jpg';
	import fb2 from '$lib/main-img/fb2.jpg';
	import fb3 from '$lib/main-img/fb3.jpg';
	import ig1 from '$lib/main-img/ig1.jpg';
	import ig2 from '$lib/main-img/ig2.jpg';
	import ig3 from '$lib/main-img/ig3.jpg';
	import ig4 from '$lib/main-img/ig4.jpg';
	/*import axios from 'axios';

	onMount(async function () {
		const response = await axios.get();
		console.log(response.data);
	});*/

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
			<a href="" class="logo-container"><img src={logo} alt="logo" class="logo" /></a>

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
								<a class="nav-link" href="">Kde nás najdete</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="">E-shop</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="">Blog</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="">Napište nám</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="">Kontakty</a>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="https://www.facebook.com/profisecondhand"
									><img class="facebook" src={facebookIcon} alt="" /></a
								>
							</li>
							<li class="nav-item circle-container">
								<div class="circle" />
							</li>
							<li class="nav-item">
								<a class="nav-link" href="https://www.instagram.com/profi_second_hand/"
									><img class="instagram" src={instagramIcon} alt="" /></a
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
				<section class="about-sect">
					<img src={staticImage} alt="obrázek oblečení" />
					<div class="text">
						<div class="sect-title">
							<h2><strong>O nás</strong></h2>
						</div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, in dolor. Nobis,
							reprehenderit expedita velit voluptatum magnam obcaecati modi provident a alias
							dolorum, minus doloremque maxime deserunt itaque labore molestias.
						</p>
					</div>
				</section>
				<section class="blog-sect">
					<div class="container">
						<div class="sect-title"><h2><strong> Second Hand a ekologie</strong></h2></div>
						<p>
							Rychlá móda má dopad na planetu. Zajímáte se o ekologii? Nyní máte možnost zjisti
							více. Second hand nabízí stylová a udržitelná řešení. Podpořte životní prostředí svým
							výběrem.
						</p>
						<div class="shadow" />
						<button>Zjistit více </button>
						<img src={branch1} alt="větev" id="branch1" />
						<img src={branch2} alt="větev" id="branch2" />
						<img src={branch3} alt="větev" id="branch3" />
					</div>
				</section>
				<section class="notification-sect">
					<div class="info">
						<div class="sect-title">
							<h1><strong>Dostávejte upozornění na akce a slevy</strong></h1>
						</div>
						<p>
							Chcete být informováni o akcích ve Vašem okolí pomocí E-Mailu a SMS? Zaregistrujte se!
						</p>
					</div>
					<form action="" method="get">
						<div class="mb-3">
							<label class="form-label"
								>E-mail
								<input type="email" class="form-control" placeholder="jannovak@seznam.cz" />
							</label>
						</div>
						<div class="mb-3">
							<label class="form-label"
								>Tel. číslo
								<input type="phone" class="form-control" placeholder="+420 777 645 189" />
							</label>
						</div>
						<div class="mb-3">
							<label class="form-label"
								>Město
								<select class="form-select">
									{#each citiesArr as city, i}
										<option value={i + 1}>{city}</option>
									{/each}
								</select>
							</label>
						</div>
						<button type="submit">Potvrdit</button>
					</form>
				</section>
				<section class="socials-sect">
					<div class="sect-title"><h1><strong>Sociální sítě</strong></h1></div>
					<div class="socials-row">
						<div class="item-container fb">
							<a href="https://www.facebook.com/profisecondhand">
								<img src={fb1} alt="facebook profi sh" />
								<img src={facebookIcon} alt="facebook profi sh" class="icon" />
							</a>
						</div>
						<div class="item-container ig">
							<a href="https://www.instagram.com/profi_second_hand/">
								<img src={ig1} alt="instagram profi sh" />
								<img src={instagramIcon} alt="instagram profi sh" class="icon" />
							</a>
						</div>
						<div class="item-container fb">
							<a href="https://www.facebook.com/profisecondhand">
								<img src={fb2} alt="facebook profi sh" />
								<img src={facebookIcon} alt="facebook profi sh" class="icon" />
							</a>
						</div>
					</div>
					<div class="socials-row">
						<div class="item-container ig">
							<a href="https://www.instagram.com/profi_second_hand/">
								<img src={ig2} alt="facebook profi sh" />
								<img src={instagramIcon} alt="instagram profi sh" class="icon" />
							</a>
						</div>
						<div class="item-container fb">
							<a href="https://www.facebook.com/profisecondhand">
								<img src={fb3} alt="facebook profi sh" />
								<img src={facebookIcon} alt="facebook profi sh" class="icon" />
							</a>
						</div>
						<div class="item-container ig">
							<a href="https://www.instagram.com/profi_second_hand/">
								<img src={ig3} alt="facebook profi sh" />
								<img src={instagramIcon} alt="instagram profi sh" class="icon" />
							</a>
						</div>
						<div class="item-container ig">
							<a href="https://www.instagram.com/profi_second_hand/">
								<img src={ig4} alt="facebook profi sh" />
								<img src={instagramIcon} alt="instagram profi sh" class="icon" />
							</a>
						</div>
					</div>
				</section>
				<footer>
					<div>
						<h2><strong>Odkazy</strong></h2>
						<ul>
							<li><a href="">Kde nás najdete </a></li>
							<li><a href="a">E-shop</a></li>
							<li><a href="a">Blog</a></li>
							<li><a href="">Napište nám </a></li>
							<li><a href="a">Kontakty</a></li>
						</ul>
					</div>
					<div>
						<h2><strong>Socialní sítě</strong></h2>
						<div class="images">
							<a href="https://www.facebook.com/profisecondhand"
								><img src={facebookIcon} alt="facebook profi sh" class="facebook" /></a
							>
							<a href="https://www.instagram.com/profi_second_hand/"
								><img src={instagramIcon} alt="instagram profi sh" class="instagram" /></a
							>
						</div>
					</div>
				</footer>
			</div>
		</main>
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
			crossorigin="anonymous"
		></script>
	</body>
</html>
