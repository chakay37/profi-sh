<script lang="ts">
	import { page } from '$app/stores';
	import img from '$lib/main-img/2.jpg';
	import { onMount } from 'svelte';
	import { getId } from '$lib/db';
	import Title from '$lib/components/Title.svelte';
	import './prodejna.scss';

	let id = $page.params.id;
	let shop: object = {};
	onMount(async () => {
		const shops = await getId('shops', Number(id));
		shop = shops['0'];
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
			<div class="map">
				{#if shop.id != undefined}
					<iframe title={shop.name} src={shop.mapsrc} frameborder="0" />
					<p>Adresa: {shop.adresa}</p>
				{/if}
			</div>

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
		</div>
		<a href="/prodejny"> <button class="secondary-button">Zpět</button></a>
	</section>
</div>
