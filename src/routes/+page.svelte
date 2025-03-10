<script lang="ts">
	import './style.scss';
	import Carousel from '$lib/components/Carousel.svelte';
	import { scrollto } from 'svelte-scrollto';
	import staticImage from '$lib/main-img/static.jpg';
	import facebookIcon from '$lib/main-img/facebook.svg';
	import instagramIcon from '$lib/main-img/instagram.svg';
	import branch1 from '$lib/main-img/branch1.svg';
	import branch2 from '$lib/main-img/branch2.svg';
	import branch3 from '$lib/main-img/branch3.svg';
	import fb1 from '$lib/main-img/fb1.jpg';
	import fb2 from '$lib/main-img/fb2.jpg';
	import fb3 from '$lib/main-img/fb3.jpg';
	import fb4 from '$lib/main-img/fb4.jpg';
	import fb5 from '$lib/main-img/fb5.jpg';
	import ig1 from '$lib/main-img/ig1.jpg';
	import ig2 from '$lib/main-img/ig2.jpg';
	import ig3 from '$lib/main-img/ig3.jpg';
	import ig4 from '$lib/main-img/ig4.jpg';

	import SectTitle from '$lib/components/Title.svelte';
	import { onMount } from 'svelte';

	import { myDBInstance } from '$lib/db';
	import DealsTable from '$lib/components/DealsTable.svelte';

	let cities: object[] = [];

	onMount(async () => {
		cities = await myDBInstance.get('cities');
		cities = cities.filter((a) => a.is_displayed == true);
	});
</script>

<body>
	<head>
		<meta
			name="description"
			content="Profi Second Hand. Ekologicky smýšlející second hand. Second hand nabízí stylová a udržitelná řešení. Podpořte životní prostředí svým výběrem."
		/>
	</head>

	<main>
		<section class="title-sect">
			<div class="title">
				<h1>Profi Second Hand</h1>
				<p>
					Ekologicky smýšlející secondhand s vynikajícím poměrem KVALITA x CENA. Častá OBMĚNA ZBOŽÍ,
					unikátní systém SLEV A VÝPRODEJŮ. Dlouholetá tradice, česká značka, 11 prodejen pro celé
					ČR. Těšíme se na Vás a přejeme, ať vyberete něco úžasného!
				</p>
				<div class="buttons">
					<button use:scrollto={'#akce'} class="primary-button">Akce a Slevy</button>
					<button use:scrollto={'#sms'} class="primary-button">Dostávejte upozornění SMS</button>
				</div>
			</div>
			<div class="carousel-bs"><Carousel /></div>
		</section>
		<section class="deals-sect" id="akce">
			<div class="title">
				<SectTitle>Nové akce</SectTitle>
			</div>
			<DealsTable />
		</section>
		<section class="notification-sect" id="sms">
			<img class="only-desktop" src={staticImage} alt="obrázek oblečení" />
			<div class="info">
				<SectTitle>Dostávejte upozornění na akce</SectTitle>
				<form action="?/user" method="post">
					<label
						>E-mail
						<input name="email" type="email" placeholder="jannovak@seznam.cz" />
					</label>

					<label
						>Tel. číslo
						<input name="phone" type="phone" placeholder="+420 777 645 189" />
					</label>

					<label
						>Město
						<select name="cityId">
							{#each cities as city}
								<option value={city.id}>{city.name}</option>
							{/each}
						</select>
					</label>

					<button class="secondary-button" formaction="?/user">Potvrdit</button>
				</form>
			</div>
		</section>
		<section class="blog-sect">
			<SectTitle>Second Hand a ekologie</SectTitle>
			<p>
				Rychlá móda má dopad na planetu. Zajímáte se o ekologii? Nyní máte možnost zjisti více.
				Second hand nabízí stylová a udržitelná řešení. Podpořte životní prostředí svým výběrem.
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
					<a target="_blank" href="https://www.facebook.com/profisecondhand">
						<img src={fb1} alt="facebook profi sh" />
						<img src={facebookIcon} alt="facebook profi sh" class="icon" />
					</a>
				</div>
				<div class="item-container ig">
					<a target="_blank" href="https://www.instagram.com/profi_second_hand/">
						<img src={ig1} alt="instagram profi sh" />
						<img src={instagramIcon} alt="instagram profi sh" class="icon" />
					</a>
				</div>
				<div class="item-container fb">
					<a target="_blank" href="https://www.facebook.com/profisecondhand">
						<img src={fb2} alt="facebook profi sh" />
						<img src={facebookIcon} alt="facebook profi sh" class="icon" />
					</a>
				</div>
				<div class="item-container fb">
					<a target="_blank" href="https://www.facebook.com/profisecondhand">
						<img src={fb3} alt="facebook profi sh" />
						<img src={facebookIcon} alt="facebook profi sh" class="icon" />
					</a>
				</div>
			</div>
			<div class="socials-row">
				<div class="item-container ig">
					<a target="_blank" href="https://www.instagram.com/profi_second_hand/">
						<img src={ig2} alt="facebook profi sh" />
						<img src={instagramIcon} alt="instagram profi sh" class="icon" />
					</a>
				</div>
				<div class="item-container fb">
					<a target="_blank" href="https://www.facebook.com/profisecondhand">
						<img src={fb4} alt="facebook profi sh" />
						<img src={facebookIcon} alt="facebook profi sh" class="icon" />
					</a>
				</div>
				<div class="item-container ig">
					<a target="_blank" href="https://www.instagram.com/profi_second_hand/">
						<img src={ig3} alt="facebook profi sh" />
						<img src={instagramIcon} alt="instagram profi sh" class="icon" />
					</a>
				</div>
				<div class="item-container ig">
					<a target="_blank" href="https://www.instagram.com/profi_second_hand/">
						<img src={ig4} alt="facebook profi sh" />
						<img src={instagramIcon} alt="instagram profi sh" class="icon" />
					</a>
				</div>
				<div class="item-container fb">
					<a target="_blank" href="https://www.facebook.com/profisecondhand">
						<img src={fb5} alt="facebook profi sh" />
						<img src={facebookIcon} alt="facebook profi sh" class="icon" />
					</a>
				</div>
			</div>
		</section>
	</main>
</body>
