<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getId, get } from '$lib/db';
	import Title from '$lib/components/Title.svelte';
	import type { Deals } from '$lib/models/models';
	import './prodejna.scss';

	let id = $page.params.id.split('_')[0];
	let shop = null;
	let deals: Deals[] = [];
	const shopPhotosNames = new Map([
		[1, 'decinPlzenska'],
		[2, 'decinPrutah'],
		[4, 'mladaBoleslav'],
		[5, 'most'],
		[6, 'pardubice'],
		[7, 'pisek'],
		[8, 'praha'],
		[9, 'tabor'],
		[10, 'teplice'],
		[11, 'ustiNadLabem'],
		[12, 'plzen']
	]);
	let photoURL = '';
	onMount(async () => {
		shop = await getId('shops', Number(id));
		deals = await get('deals');
		deals = deals.filter((deal) => deal.shopId == shop.id);
		deals = deals.sort(
			(a, b) =>
				Date.UTC(
					new Date(a.date).getFullYear(),
					new Date(a.date).getMonth(),
					new Date(a.date).getDate()
				) -
				Date.UTC(
					new Date(b.date).getFullYear(),
					new Date(b.date).getMonth(),
					new Date(b.date).getDate()
				)
		);
		deals = deals.slice(-7);

		let dayInWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];

		for (let i = 0; i < deals.length; i++) {
			switch (deals[i].type) {
				case 0:
					deals[i].tableText = deals[i]['value'] + '% SLEVA!';
					break;
				case 1:
					deals[i].tableText = '!NOVÉ ZBOŽÍ!';
					break;
				case 2:
					deals[i].tableText = 'Vše za ' + deals[i]['value'] + ',- Kč';
					break;
				case 3:
					deals[i].tableText = 'Svátek';
					break;
				case 4:
					deals[i].tableText = deals[i].text;
					break;
				case 5:
					deals[i].tableText = 'Zavřeno';
					break;
				default:
					break;
			}

			let date = new Date(deals[i].date);
			deals[i].dateStr =
				dayInWeek[date.getDay()] + ' ' + date.getDate() + '. ' + (date.getMonth() + 1) + '.';

			date = new Date(deals[i].enddate);
			deals[i].enddateStr =
				dayInWeek[date.getDay()] + ' ' + date.getDate() + '. ' + (date.getMonth() + 1) + '.';

			if (deals[i].text == null || deals[i].text == undefined) {
				deals[i].text = '';
			}
		}

		/*const response = await fetch(
			'https://file-upload-sh.s3.amazonaws.com/' + shopPhotosNames.get(Number(id)) + '.jpg'
		);
		const blob = await response.blob();
		//let photoOut = await response.json();

		//photosURL.push(URL.createObjectURL(blob));
		photoURL = URL.createObjectURL(blob);*/
	});
</script>

<div class="prodejna-page">
	<section>
		<div class="shop-name-container">
			<div class="name-container">
				{#if shop?.id != undefined}
					<Title>
						{shop.name}
					</Title>
				{/if}
			</div>
			<img class="only-desktop" alt="" />
		</div>
		<div class="info-container">
			<div class="opening">
				<p>Otevírací doba</p>
				<table>
					<thead>
						<tr>
							<th scope="col">Pondělí</th>
							<th scope="col">Úterý</th>
							<th scope="col">Středa</th>
							<th scope="col">Čtvrtek</th>
							<th scope="col">Pátek</th>
							<th scope="col">Sobota</th>
							<th scope="col">Neděle</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{#if shop?.id != undefined}
								<td>{shop.Mon}</td>
								<td>{shop.Tue}</td>
								<td>{shop.Wed}</td>
								<td>{shop.Thu}</td>
								<td>{shop.Fri}</td>
								<td>{shop.Sat}</td>
								<td>Zavřeno</td>
							{/if}
						</tr>
					</tbody>
				</table>
			</div>
			<div class="map">
				{#if shop?.id != undefined}
					<iframe title={shop.name} src={shop.mapsrc} frameborder="0"></iframe>
					<p>Adresa: {shop.adresa}</p>
				{/if}
			</div>
			{#if deals.length > 0}
				<div class="deals">
					<p>Akce a slevy</p>
					{#each deals as d}
						{#if new Date(d.enddate) > new Date()}
							<div class="deal">
								<h3>{d.dateStr} - {d.enddateStr}</h3>
								<h4>{d.tableText}</h4>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
		<a href="/prodejny"> <button class="secondary-button">Zpět</button></a>
	</section>
</div>
