<script lang="ts">
	import './style.scss';
	import Carousel from '$lib/components/Carousel.svelte';
	import { browser } from '$app/environment';
	import { scrollto } from 'svelte-scrollto';

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

	import SectTitle from '$lib/components/Title.svelte';
	import { onMount } from 'svelte';
	import { json } from '@sveltejs/kit';

	import { get } from '$lib/db';

	let shops = [
		{ id: -1, name: '' },
		{ id: -1, name: '' },
		{ id: -1, name: '' },
		{ id: -1, name: '' },
		{ id: -1, name: '' }
	];
	let cities: object[] = [];

	onMount(async () => {
		shops = await get('shops');
		cities = await get('cities');
		//shopsArr = shops.map((shop: { [x: string]: object; }) => {return shop['name']})
	});

	function postUser() {}

	import { Users } from '$lib/models/models';
	let user: Users = new Users('', '', 0);
</script>

<main>
	<section class="title-sect">
		<div class="title">
			<h1>Profi Second Hand</h1>
			<div class="buttons">
				<button use:scrollto={'#akce'} class="secondary-button">Akce a Slevy</button>
				<button use:scrollto={'#sms'} class="secondary-button">Dostávejte upozornění SMS</button>
			</div>
		</div>
		<div class="carousel-bs"><Carousel /></div>
	</section>
	<section class="deals-sect" id="akce">
		<SectTitle>Nové akce</SectTitle>

		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th class="corner" scope="col" />
						<th scope="col">Dnes</th>
						<th scope="col">Zítra</th>
						<th scope="col">So 26.8.</th>
						<th scope="col">Ne 27.8.</th>
						<th scope="col">Po 28.8.</th>
						<th scope="col">Út 29.8.</th>
						<th scope="col">St 30.8.</th>
						<th scope="col">Čt 1.9.</th>
						<th scope="col">Pá 2.9.</th>
						<th scope="col">So 3.9.</th>
						<th scope="col">Ne 4.9.</th>
					</tr>
				</thead>
				<tbody>
					{#each shops as shop}
						<tr>
							<th scope="row">{shop['name']}</th>
							<td
								><div class="table-item">
									<p>-30%</p>
									<a href="">Zjistit více <img src={linkIcon} alt="Odkaz na akci" /></a>
								</div></td
							>
							<td
								><div class="table-item">
									<p>-20%</p>
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
							<td />
							<td />
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
	<section class="notification-sect" id="sms">
		<img class="only-desktop" src={staticImage} alt="obrázek oblečení" />
		<div class="info">
			<SectTitle>Dostávejte upozornění na akce</SectTitle>
			<form on:submit={postUser} method="post">
				<label
					>E-mail
					<input bind:value={user.email} type="email" placeholder="jannovak@seznam.cz" />
				</label>

				<label
					>Tel. číslo
					<input bind:value={user.phone} type="phone" placeholder="+420 777 645 189" />
				</label>

				<label
					>Město
					<select bind:value={user.cityId}>
						{#each cities as city, i}
							<option value={i + 1}>{city.name}</option>
						{/each}
					</select>
				</label>

				<button class="secondary-button" type="submit">Potvrdit</button>
			</form>
		</div>
	</section>
	<section class="blog-sect">
		<SectTitle>Second Hand a ekologie</SectTitle>
		<p>
			Rychlá móda má dopad na planetu. Zajímáte se o ekologii? Nyní máte možnost zjisti více. Second
			hand nabízí stylová a udržitelná řešení. Podpořte životní prostředí svým výběrem.
		</p>
		<div class="shadow" />
		<a href="blog"><button class="primary-button">Zjistit více </button></a>
		<img src={branch1} alt="větev" id="branch1" class="only-desktop" />
		<img src={branch2} alt="větev" id="branch2" class="only-desktop" />
		<img src={branch3} alt="větev" id="branch3" class="only-desktop" />
	</section>

	<section class="socials-sect">
		<SectTitle>Sociální sítě</SectTitle>
		<div class="socials-row" id="only-desktop">
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
</main>
