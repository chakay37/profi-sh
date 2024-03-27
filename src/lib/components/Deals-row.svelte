<script lang="ts">
	import type { Deals } from '$lib/models/models';
	import Modal from '$lib/components/Modal.svelte';

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
	
	console.log(deals)
	export let date: string = '';

	let showModal = false;
	let modalHeaderText = '';
	let modalBodyText = '';
	function ShowModal(shop: object) {
		deals.forEach((deal) => {
			if (deal.dateStr == date && deal.shopId == shop.id) {
				modalHeaderText = 'Akce: ' + shop.name + ', ' + date;
				modalBodyText = deal.text;
				showModal = true;
			}
		});
	}
</script>

<tr class:weekend-row={weekend}>
	<th scope="row" class="head-dates">{date}</th>
	{#each shops as shop}
		<td on:click={ShowModal(shop)}>

				{#each deals as deal}
					{#if deal.dateStr == date && deal.shopId == shop.id}
						<h4 style="cursor: pointer;">{deal.tableText}</h4>
					{/if}
				{/each}
		</td>
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
