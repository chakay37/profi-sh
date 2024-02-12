<script lang="ts">
	import type { Deals } from '$lib/models/models';
	import Modal from '$lib/components/Modal.svelte';

	export let weekend = false;
	export let shops: object[] = [];
	export let deals: Deals[] = [];
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
					{#if deal['type'] == 0}
						-{deal['value']}%
					{/if}
					{#if deal['type'] == 1}
						Nové zboží
					{/if}
					{#if deal['type'] == 2}
						Vše za {deal['value']},- kč
					{/if}
					{#if deal['type'] == 3}
						Svátek
					{/if}
					{#if deal['type'] == 4}
						Jiná akce
					{/if}
				{/if}
			{/each}
		</td>
	{/each}
</tr>

<Modal bind:showModal>
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
