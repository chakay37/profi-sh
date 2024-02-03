<script lang="ts">
	import { page } from '$app/stores';
	import img from '$lib/main-img/2.jpg';
	import { onMount } from 'svelte';
	import { getId } from '$lib/db';
	import Title from '$lib/components/Title.svelte';
	import './article.scss';

	let id = $page.params.id;
	let article: object = {};
	onMount(async () => {
		const articles = await getId('articles', Number(id));
		article = articles['0'];
		article.date = article.date
			.split('T')
			['0'].split('-')
			.reverse()
			.toString()
			.replaceAll(',', '.');
	});
</script>

<div class="article-page">
	<section>
		<div class="article-container">
			<div>
				{#if article.id != null}
					<Title>{article.name}</Title>
					<h4>{article.date}</h4>
					<p>{article.text}</p>
				{/if}
			</div>
			<button class="primary-button">Zpět</button>
		</div>
	</section>
</div>
