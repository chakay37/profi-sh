<script lang="ts">
	import type { Deals } from '$lib/models/models';
	import Modal from '$lib/components/Modal.svelte';

	export let weekend = false;
	export let shops: object[] = [];
	export let deals: Deals[] = [];
	export let date: string = '';

	let showModal = false;
</script>

<tr class:weekend-row={weekend}>
	<th scope="row" class="head-dates">{date}</th>
	{#each shops as shop}
		<td on:click={() => (showModal = true)}>
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
	<h2 slot="header">
		modal
		<small><em>adjective</em> mod·al \ˈmō-dəl\</small>
	</h2>

	<ol class="definition-list">
		<li>of or relating to modality in logic</li>
		<li>
			containing provisions as to the mode of procedure or the manner of taking effect —used of a
			contract or legacy
		</li>
		<li>of or relating to a musical mode</li>
		<li>of or relating to structure as opposed to substance</li>
		<li>
			of, relating to, or constituting a grammatical form or category characteristically indicating
			predication
		</li>
		<li>of or relating to a statistical mode</li>
	</ol>

	<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
</Modal>

<style lang="scss">
	$logo-color: #a7996b;
	$logo-color-dark: #8f8054;
	$logo-color-light: #b6a771;
	$white: #f1f1ee;

	.weekend-row {
		background-color: $logo-color;
	}
</style>
