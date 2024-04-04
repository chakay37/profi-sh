<script lang="ts">
	import { Deals } from '$lib/models/models';
	import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';

	export let weekend = false;
	export let shops: object[] = [];
	export let deals: Deals[] = [];



		for (let i = 0; i < deals.length; i++) {
		switch (deals[i].type) {
			case 0:
				deals[i].tableText = '-' + deals[i]['value'] + '%';
				break;
			case 1:
				deals[i].tableText = 'Nové zboží';
				break;
			case 2:
				deals[i].tableText = 'Vše za '+deals[i]['value']+',- Kč';
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
	}
	export let date: object;
	let dateStr: string = date.dateStr;

	let showModal = false;
	let modalHeaderText = '';
	let modalBodyText = '';
	let shopsToDelete: object[] = [];
	function ShowModal(shop: object) {
		deals.forEach((deal) => {
			if (deal.dateStr == dateStr && deal.shopId == shop.id) {
				modalHeaderText = 'Akce: ' + shop.name + ', ' + dateStr;
				modalBodyText = deal.text;
				showModal = true;
				
			}
		});
	}
	shops.forEach((shop) => {
		shop.deal = new Deals(0, new Date(), new Date(), 0, '', 0, '', '');
	});
	shops.forEach((shop) => {
	deals.forEach((deal) => {
		const dateObj = new Date(deal.date);
		const rowDateObj = new Date(date.date);
		const enddateObj = new Date(deal.enddate);

		const utc = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
		const utcRow = Date.UTC(rowDateObj.getFullYear(), rowDateObj.getMonth(), rowDateObj.getDate());
		const utcEnd = Date.UTC(enddateObj.getFullYear(), enddateObj.getMonth(), enddateObj.getDate());

		const dateDiff = Math.abs(utcEnd - utc);
		const diffDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24)); 

		const rowDateDiff = Math.abs(utcRow - utc);
		const rowDiffDays = Math.ceil(rowDateDiff / (1000 * 60 * 60 * 24)); 

		const rowEndDateDiff = Math.abs(utcEnd - utcRow);
		const endRowDiffDays = Math.ceil(rowEndDateDiff / (1000 * 60 * 60 * 24)); 

		if (deal.dateStr == dateStr && deal.shopId == shop.id) {
			shop.deal = deal;
			shop.deal.tableText = deal.tableText;
			shop.deal.rowSpan = 1;
			

			if (diffDays > 1) {
				shop.deal.rowSpan = diffDays;
			}
		}
		if (deal.shopId == shop.id) {
			//console.log(deal.tableText+'    '+shop.name+'  '+rowDiffDays+'	'+deal.date+'	'+new Date(date.date));
			//console.log(diffDays + '	' + rowDiffDays + '	' + endRowDiffDays);
			if ( diffDays > rowDiffDays && diffDays > endRowDiffDays ) {
				shopsToDelete.push(shop);
			}
		}
	});
})

</script>

<tr class:weekend-row={weekend}>
	<th scope="row" class="head-dates">{dateStr}</th>
	{#each shops as s}
		{#if s.deal.rowSpan !== null && s.deal.rowSpan !== undefined && s.deal.rowSpan > 1}
			<td style="background-color: #b6a771; cursor: pointer;" rowspan={s.deal.rowSpan} on:click={ShowModal(s)}>
				<h4>{s.deal.rowSpan} {s.deal.tableText}</h4>
			</td>
		{:else}
			{#if shopsToDelete.find(a => a.id === s.id) === undefined}
				<td>{s.name}</td>
			{/if}
		{/if}
	{/each}
</tr>

<Modal bind:showModal warning={false}>
	<h2 slot="header">{modalHeaderText}</h2>

	<p class="modal-body">{modalBodyText}</p>
</Modal>

<style lang="scss">
	$logo-color: #a7996b;
	$logo-color-dark: #8f8054;
	$logo-color-light: #b6a771;
	$white: #f1f1ee;

	.weekend-row {
		background-color: $logo-color;
	}
	.modal-body {
		padding: 10px;
	}
</style>
