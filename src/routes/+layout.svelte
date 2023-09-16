<script lang="ts">
	import './header.scss';
	import './footer.scss';
	import './GLOBAL.scss';
	import logo from '$lib/main-img/logo.png';
	import facebookIcon from '$lib/main-img/facebook.svg';
	import instagramIcon from '$lib/main-img/instagram.svg';

	let init = true;
	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
		init = false;
	}
	function closeNav() {
		isNavOpen = false;
		init = false;
	}
</script>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
</head>
<header>
	<a href="/" class="logo-container"><img src={logo} alt="logo" class="logo" /></a>
	<nav class="desktop-navbar">
		<ul>
			<li class="nav-item">
				<a class="nav-link" href="prodejny">Kde nás najdete</a>
			</li>
			<li class="nav-item circle-container">
				<div class="circle" />
			</li>
			<li class="nav-item">
				<a class="nav-link" href="eshop">E-shop</a>
			</li>
			<li class="nav-item circle-container">
				<div class="circle" />
			</li>
			<li class="nav-item">
				<a class="nav-link" href="blog">Blog</a>
			</li>
			<li class="nav-item circle-container">
				<div class="circle" />
			</li>
			<li class="nav-item">
				<a class="nav-link" href="feedback">Napište nám</a>
			</li>
			<li class="nav-item circle-container">
				<div class="circle" />
			</li>
			<li class="nav-item">
				<a class="nav-link" href="kontakty">Kontakty</a>
			</li>
			<li class="nav-item circle-container">
				<div class="circle" />
			</li>
			<li class="nav-item">
				<a href="https://www.facebook.com/profisecondhand"
					><img class="facebook" src={facebookIcon} alt="" /></a
				>
			</li>
			<li class="nav-item circle-container">
				<div class="circle" />
			</li>
			<li class="nav-item">
				<a href="https://www.instagram.com/profi_second_hand/"
					><img class="instagram" src={instagramIcon} alt="" /></a
				>
			</li>
		</ul>
	</nav>
	<div class="mobile-navbar">
		<button class="show-navbar" on:click={toggleNav}>
			<span class="nav-button">☰</span>
		</button>
	</div>
	{#if !init}
		<nav class="nav-container" class:open={isNavOpen}>
			<ul class="nav-list">
				<li class="nav-item">
					<a class="nav-link" href="prodejny">Kde nás najdete</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="eshop">E-shop</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="blog">Blog</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="feedback">Napište nám</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="kontakty">Kontakty</a>
				</li>

				<li class="nav-item social-container">
					<a href="https://www.facebook.com/profisecondhand"
						><img class="facebook" src={facebookIcon} alt="" /></a
					>
					<a href="https://www.instagram.com/profi_second_hand/"
						><img class="instagram" src={instagramIcon} alt="" /></a
					>
				</li>
			</ul>
		</nav>
		{#if isNavOpen}
			<div class="backdrop" on:click={closeNav} />
		{/if}
	{/if}
</header>
<slot />
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
