<script lang="ts">
	import { page } from '$app/stores';
	import img from '$lib/main-img/2.jpg';
	import { onMount } from 'svelte';
	import { getId } from '$lib/db';
	import Title from '$lib/components/Title.svelte';
	import './article.scss';
	import { redirect } from '@sveltejs/kit';

	let id = Number($page.params.id);
	if (id == null || id == undefined) {
		redirect(302, '/');
	}
	let article: object = {};
	let datesArrs = [];
	onMount(async () => {
		if (id != 0) {
			const articles = await getId('articles', Number(id));
			articles.forEach((a) => datesArrs.push(a.date.split('T')['0'].split('-')));
			datesArrs.forEach((arr) => arr.reverse().toString());
			for (let index = 0; index < datesArrs.length; index++) {
				articles[index].date = datesArrs[index];
			}
			articles.forEach((a) => (a.date = a.date.toString().replaceAll(',', '.')));
			article = articles[0];
		}
	});
</script>

<div class="article-page">
	<section>
		<div class="article-container">
			<div>
				{#if article.id != null}
					<Title>{article.name}</Title>
					<h4>{article.date}</h4>
					<p>{@html article.text}</p>
				{/if}
			</div>
			<a href="/blog"> <button class="primary-button">Zpět</button></a>
		</div>
	</section>
</div>
