<script lang="ts">
	import './blog.scss';
	import leavesbg from '$lib/main-img/leaves-bg.jpg';
	import Title from '$lib/components/Title.svelte';
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
</script>

<div class="blog-page">
	<section>
		{#each articles as article}
			<a href="/blog/{article.id}" class="card">
				<div class="img-container">
					<img
						src="https://source.unsplash.com/random/500x200+{article.id}+/?forest,nature"
						alt="Obrázek článku"
					/>
					<div class="gradient"></div>
				</div>
				<div class="text">
					<h3>{article.name}</h3>
					<p>{article.date}</p>
				</div>
			</a>
		{/each}
	</section>
</div>
