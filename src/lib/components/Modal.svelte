<script lang="ts">
	import { onMount } from 'svelte';
	import { myDBInstance } from '$lib/db';

	export let showModal; // boolean

	let dialog; // HTMLDialogElement
	export let warning: boolean = false;
	export let deals: object[];
	export let dealToChange: object | null;

	$: if (dialog && showModal) dialog.showModal();

	async function delDeal() {
		if (deals.length > 0 && dealToChange != null) {
			deals = deals.filter((a) => a.id != dealToChange.id);
			const db = myDBInstance.withFetch(fetch);
			await db.del('deals', dealToChange.id);
		}
		dealToChange = null;
		showModal = false;
		dialog.close();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<div style="display: flex;">
			<button class="primary-button" autofocus on:click={() => dialog.close()}>Zavřít</button>
			{#if warning}
				<button class="primary-button" on:click={() => delDeal()}>Potvrdit smazání</button>
			{/if}
		</div>
	</div>
</dialog>

<style lang="scss">
	$logo-color: #a7996b;
	$logo-color-dark: #8f8054;
	$logo-color-light: #b6a771;
	$white: #f1f1ee;

	dialog {
		max-width: 32em;
		border-radius: 10px;
		border: none;
		padding: 0;
		margin-top: 40vh;
		background-color: $logo-color-dark;
		border: $white solid 2px;
		color: $white;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		padding-inline: 20px;
		display: block;
		margin-top: 10px;
		margin-right: 20px;
	}
	hr {
		color: white;
	}
</style>
