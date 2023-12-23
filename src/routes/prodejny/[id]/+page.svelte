<script lang="ts">
	import { page } from '$app/stores';
	import img from '$lib/main-img/2.jpg';
	import { onMount } from 'svelte';
	import { get } from '$lib/db';
	import Title from '$lib/components/Title.svelte';
	import './prodejna.scss'

	let id = $page.params.id;
	let shops: object[] = [];
	let shop: object | undefined;
	onMount(async () => {
		shops = await get('shops');
		shops = shops.filter((s) => s.id == id);
		shop = shops.at(0);
	});
</script>

<div class="prodejna-page">
	<section>
		{#if shop}
			<Title>
				{shop.name}
			</Title>
		{/if}
		<img src="{img}" alt="">
	</section>
</div>
