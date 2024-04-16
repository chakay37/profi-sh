<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getId } from '$lib/db';
	import { goto } from '$app/navigation';
	import { get, post, put, del } from '$lib/db';
	import './article.scss';

	let id = Number($page.params.id);
	let article: object = {};
	let articles: object[] = [];
	export let data;
	
	function goBack() {
		articles = [];
		goto('/editor/articles');
	}

	async function deleteArticle() {
		await del('articles', id);
		articles = [];
		article = {};
		goto('/editor/articles');
	}

	onMount(async () => {
		if (data.authenticated == false) {
			goto('/editor');
		}

		if (id != 0) {
			articles = await getId('articles', Number(id));
			article = articles['0'];
		}
	});
</script>

<div class="article-page">
	<section>	
			{#if id === 0}
				<form action="?/articlePost" method="post">
					<div class="static-title">
						<input name="name" class="title-input" type="text" placeholder="Nadpis" bind:value={article.name} />
					</div>
					<Editor bind:value={article.text} apiKey="8bguh6cb50x2t5ga3fagm5yz11tygdz171h9kwa9vxs5vpbm" />
					<input type="text" name="text" bind:value={article.text} hidden>
					<div class="buttons">
						<button on:click={goBack} type="button" class="secondary-button back">Zpět</button>
					<button type="submit" class="secondary-button save">ULOŽIT</button>
					</div>
				</form>
			{:else}
			{#if articles.length !== 0}
				<form action="?/articlePut" method="post">
					<input type="number" name="id" value={id} hidden>
					<div class="static-title">
						<input class="title-input" type="text" placeholder="Nadpis" name="name" bind:value={article.name} />
						<button on:click={deleteArticle} type="button" class="secondary-button delete">Smazat článek</button>
					</div>
					<Editor bind:value={article.text} apiKey="8bguh6cb50x2t5ga3fagm5yz11tygdz171h9kwa9vxs5vpbm" />
					<input type="text" name="text" bind:value={article.text} hidden>
					<div class="buttons">
						<button on:click={goBack} type="button" class="secondary-button back">Zpět</button>
					<button type="submit" class="secondary-button save">ULOŽIT</button>
					</div>
				</form>
			{/if}
		{/if}
	</section>
</div>
