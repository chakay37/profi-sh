<script lang="ts">
	import './prodejny.scss';
	import img from '$lib/main-img/2.jpg';
	import { onMount } from 'svelte';
	import { get } from '$lib/db';

	let shops: object[] = [];
	onMount(async () => {
		shops = await get('shops');
	});
</script>

<div class="prodejny-page">
	<section>
		{#each shops as shop}
			<a href="/prodejny/{shop.id}" class="card">
				<div class="img-container">
					<img src={img} alt="Obrázek prodejny" />
					<div class="gradient" />
				</div>
				<div class="text">
					<h3>{shop.name}</h3>
				</div>
			</a>
		{/each}
	</section>
</div>
