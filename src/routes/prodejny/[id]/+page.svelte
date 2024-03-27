<script lang="ts">
	import { page } from '$app/stores';
	import img from '$lib/main-img/2.jpg';
	import { onMount } from 'svelte';
	import { getId, get } from '$lib/db';
	import Title from '$lib/components/Title.svelte';
	import type { Deals } from '$lib/models/models';
	import './prodejna.scss';

	let id = $page.params.id;
	let shop: object = {};
	let deals: Deals[] = [];
	onMount(async () => {
		const shops = await getId('shops', Number(id));
		shop = shops['0'];

		deals = await get('deals');
		deals = deals.filter((deal) => deal.shopId == shop.id);
		let dayInWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];

		for (let i = 0; i < deals.length; i++) {
			switch (deals[i].type) {
				case 0:
					deals[i].tableText = '-' + deals[i]['value'] + '%';
					break;
				case 1:
					deals[i].tableText = 'Nové zboží';
					break;
				case 2:
					deals[i].tableText = 'Vše za ' + deals[i]['value'] + ',- Kč';
					break;
				case 3:
					deals[i].tableText = 'Svátek';
					break;
				case 4:
					deals[i].tableText = 'Jiná akce';
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

			if(deals[i].text == null || deals[i].text == undefined) {
				deals[i].text = '';
			}
		}
	});
</script>

<div class="prodejna-page">
	<section>
		<div class="shop-name-container">
			<div class="name-container">
				{#if shop.id != undefined}
					<Title>
						{shop.name}
					</Title>
				{/if}
			</div>
			<img class="only-desktop" src={img} alt="" />
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
							{#if shop.id != undefined}
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
				{#if shop.id != undefined}
					<iframe title={shop.name} src={shop.mapsrc} frameborder="0" />
					<p>Adresa: {shop.adresa}</p>
				{/if}
			</div>
			<div class="deals">
				{#each deals as d}
					{d.dateStr}-{d.enddateStr}: {d.tableText}
				{/each}
			</div>
		</div>
		<a href="/prodejny"> <button class="secondary-button">Zpět</button></a>
	</section>
</div>
