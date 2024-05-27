<script lang="ts">
	import './style.scss';
	import Carousel from '$lib/components/Carousel.svelte';
	import { scrollto } from 'svelte-scrollto';

	import staticImage from '$lib/main-img/static.jpg';
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
	import fb4 from '$lib/main-img/fb4.jpg';
	import fb5 from '$lib/main-img/fb5.jpg';
	import ig1 from '$lib/main-img/ig1.jpg';
	import ig2 from '$lib/main-img/ig2.jpg';
	import ig3 from '$lib/main-img/ig3.jpg';
	import ig4 from '$lib/main-img/ig4.jpg';

	import SectTitle from '$lib/components/Title.svelte';
	import { onMount } from 'svelte';
	import { json } from '@sveltejs/kit';

	import { myDBInstance } from '$lib/db';
	import type { Deals } from '$lib/models/models';
	import DealsRow from '$lib/components/Deals-row.svelte';

	let shops: object[] = [];
	let cities: object[] = [];
	let deals: Deals[] = [];

	let shopsNames: string[] = [
		'Děčín - Plzeňská',
		'Děčín - Průtah',
		'Mladá Boleslav',
		'Most',
		'Pardubice',
		'Písek',
		'Praha 8',
		'Tábor',
		'Teplice',
		'Ústí nad Labem',
		'Plzeň'
	];
	onMount(async () => {
		cities = await myDBInstance.get('cities');
		shops = await myDBInstance.get('shops');

		shopsNames = [];
		shops.forEach((shop) => shopsNames.push(shop.name));

		deals = await myDBInstance.get('deals');

		//shopsArr = shops.map((shop: { [x: string]: object; }) => {return shop['name']})

		for (let i = 0; i < deals.length; i++) {
			let date = new Date(deals[i].date)
			let enddate = new Date(deals[i].enddate)
			let today = new Date();
			let utc = Date.UTC(
				date.getFullYear(),
				date.getMonth(),
				date.getDate()
			);
			let utcEnd = Date.UTC(
				enddate.getFullYear(),
				enddate.getMonth(),
				enddate.getDate()
			);
			let utcToday = Date.UTC(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			);
			
			if (utcToday - utc > 0 && utcToday - utcEnd <= 0)
			{

				deals[i].date = date.toISOString();
			}
			
		}
		

		
		

		for (let i = 0; i < deals.length; i++) {
			let date = new Date(deals[i].date);
			deals[i].dateStr =
				dayInWeek[date.getDay()] + ' ' + date.getDate() + '. ' + (date.getMonth() + 1) + '.';

			let enddate = new Date(deals[i].enddate);
			deals[i].enddateStr =
				dayInWeek[enddate.getDay()] + ' ' + enddate.getDate() + '. ' + (enddate.getMonth() + 1) + '.';
		}
	});

	let dayInWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
	let datesObj: object[] = [];
	for (let i = 0; i < 35; i++) {
		let date: Date = new Date();
		date.setDate(new Date().getDate() + i - 6);
		datesObj.push({dateStr: dayInWeek[date.getDay()] + ' ' + date.getDate() + '. ' + (date.getMonth() + 1) + '.',
						date: date});
		let firstMonday = datesObj.findIndex(date => date.date.getDay() === 1)
		datesObj = datesObj.slice(firstMonday, 28)
	}
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
			<div class="table-container">
				<table>
					<thead>
						<tr>
							<th class="corner"  scope="col" />
							{#each shopsNames as shop}
								<th  scope="col">{shop}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#if deals.length > 0 && shops.length > 0 && datesObj.length > 12}
							{#each datesObj as date}
								{#if date.dateStr.split(' ')[0] == 'Ne'}
									<DealsRow weekend={true} {deals} {shops} {date} />
								{/if}
								{#if date.dateStr.split(' ')[0] != 'Ne'}
									<DealsRow weekend={false} {deals} {shops} {date} />
								{/if}
							{/each}
						{:else}
							{#each datesObj as date}
								<tr>
									<th scope="row" class="head-dates">{date.dateStr}</th>
									{#each shops as s}
										<td></td>
									{/each}
								</tr>
							{/each}
						
						{/if}
						
					</tbody>
				</table>
			</div>
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
