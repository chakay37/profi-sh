<script lang="ts">
	import { onMount } from 'svelte';
	import { myDBInstance } from '$lib/db';
	import type { Deals } from '$lib/models/models';
	import DealsRow from '$lib/components/Deals-row.svelte';
	import './DealsTable.scss';

	export let days = 28;
	let shops: object[] = [];
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
		shops = await myDBInstance.get('shops');
		shops = shops.sort((a, b) => a.name > b.name);

		shopsNames = [];
		shops.forEach((shop) => shopsNames.push(shop.name));

		deals = await myDBInstance.get('deals');

		for (let i = 0; i < deals.length; i++) {
			let date = new Date(deals[i].date);
			let enddate = new Date(deals[i].enddate);
			let today = new Date();
			let utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
			let utcEnd = Date.UTC(enddate.getFullYear(), enddate.getMonth(), enddate.getDate());
			let utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

			if (utcToday - utc > 0 && utcToday - utcEnd <= 0) {
				deals[i].date = date.toISOString();
			}
		}

		for (let i = 0; i < deals.length; i++) {
			let date = new Date(deals[i].date);
			deals[i].dateStr =
				dayInWeek[date.getDay()] + ' ' + date.getDate() + '. ' + (date.getMonth() + 1) + '.';

			let enddate = new Date(deals[i].enddate);
			deals[i].enddateStr =
				dayInWeek[enddate.getDay()] +
				' ' +
				enddate.getDate() +
				'. ' +
				(enddate.getMonth() + 1) +
				'.';
		}
	});
	let dayInWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
	let datesObj: object[] = [];
	for (let i = 0; i < days + 7; i++) {
		let date: Date = new Date();
		date.setDate(new Date().getDate() + i - 6);
		datesObj.push({
			dateStr: dayInWeek[date.getDay()] + ' ' + date.getDate() + '. ' + (date.getMonth() + 1) + '.',
			date: date
		});
		let firstMonday = datesObj.findIndex((date) => date.date.getDay() === 1);
		datesObj = datesObj.slice(firstMonday, days);
	}
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th class="corner" scope="col"></th>
				{#each shopsNames as shop}
					<th scope="col">{shop}</th>
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
