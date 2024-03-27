<script lang="ts">
	import './selectArticle.scss';
	import { get } from '$lib/db';
	import { onMount } from 'svelte';

	let articles: object[] = [];
	let datesArrs = [];
	onMount(async () => {
		articles = await get('articles');
		articles.forEach((a) => datesArrs.push(a.date.split('T')['0'].split('-')));
		datesArrs.forEach((arr) => arr.reverse().toString());
		for (let index = 0; index < datesArrs.length; index++) {
			articles[index].date = datesArrs[index];
		}
		articles.forEach((a) => (a.date = a.date.toString().replaceAll(',', '.')));
	});

	//article text max
</script>

<div class="articles-page">
	<section>
		<a href="/editor/articles/0" class="card new-article">
			<h1>Nový článek</h1>
			<div class="text">
				<h1 class="plus-icon">+</h1>
			</div>
		</a>
		{#each articles as article}
		
			<a href="/editor/articles/{article.id}" class="card">
				<div class="text">
					<h3>{article.name}</h3>
					<p>{article.date}</p>
					<div class="article-text">{@html article.text}</div>
				</div>
			</a>
		{/each}
	</section>
</div>
