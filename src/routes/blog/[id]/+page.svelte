<script lang="ts">
	import { page } from '$app/stores';
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
			article = await getId('articles', Number(id));
			article.forEach((a) => datesArrs.push(a.date.split('T')['0'].split('-')));
			datesArrs.forEach((arr) => arr.reverse().toString());
			for (let index = 0; index < datesArrs.length; index++) {
				article[index].date = datesArrs[index];
			}
			article.forEach((a) => (a.date = a.date.toString().replaceAll(',', '.')));
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
