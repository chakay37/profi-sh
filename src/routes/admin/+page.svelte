<script lang="ts">
	import { onMount } from 'svelte';
	import { get, post } from '$lib/db';
	import process from 'process';
	import { encode, decode } from 'js-base64';
	import Title from '$lib/components/Title.svelte';
	import { handleSubmit } from '$lib/photos.svelte';
	import './style.scss';

	let photosURL: string[] = [];
	//SF/4OVvE5KvU57QNjYz4y0IlMMx7IhhvFbFSO5WY

	const SubmitFirst = async (e: SubmitEvent) => {
		await handleSubmit(e, '1');
	};
	const SubmitSecond = async (e: SubmitEvent) => {
		await handleSubmit(e, '2');
	};
	const SubmitThird = async (e: SubmitEvent) => {
		await handleSubmit(e, '3');
	};
	const SubmitForth = async (e: SubmitEvent) => {
		await handleSubmit(e, '4');
	};
	const SubmitFifth = async (e: SubmitEvent) => {
		await handleSubmit(e, '5');
	};

	let photos: object[] = [{}];
	let shops: object[] = [];
	onMount(async () => {
		try {
			for (let i = 1; i < 6; i++) {
				const response = await fetch('https://file-upload-sh.s3.amazonaws.com/' + i + '.jpg');
				const blob = await response.blob();
				//let photoOut = await response.json();

				console.log(blob);
				photosURL.push(URL.createObjectURL(blob));
			}
		} catch (error) {
			console.error('Error loading images:', error);
		}
		//shopsArr = shops.map((shop: { [x: string]: object; }) => {return shop['name']})
		photosURL = photosURL;
		console.log(photosURL);
		photos = await get('photos');
		shops = await get('shops');
	});

	let aaa: FileList;
</script>

<body>
	<div class="admin-page">
		<section>
			<div class="card akce">
				<h1>Akce a slevy</h1>
				<form action="?/deal" method="post">
					<h3>Nová akce</h3>
					<label
						>Typ akce:
						<select name="type">
							<option value="0">Sleva</option>
							<option value="1">Nové zboží</option>
							<option value="2">Svátek</option>
							<option value="3">Jiné</option>
						</select>
					</label>
					<label
						>Hodnota slevy: (např. "40%" nebo "50 Kč")
						<input type="text" name="value" />
					</label>
					<label
						>Výběr obchodu:
						<select name="shopId">
							{#each shops as shop}
								<option value={shop.id}>{shop.name}</option>
							{/each}
						</select>
					</label>
					<label
						>Akce OD:
						<input type="date" name="date" />
					</label>
					<label
						>Akce DO:
						<input type="date" name="enddate" />
					</label>
					<label
						>Pár vět o akci:
						<textarea name="text" />
					</label>
					<button type="submit">Přidat akci</button>
				</form>
				<h3>Změna akcí</h3>
			</div>
			<div class="card">
				<h1>Kolotoč obrázek 1</h1>
				<form on:submit|preventDefault={SubmitFirst}>
					<label class="imageSelector primary-button"
						>{#if aaa == undefined}
							Změň obrázek
						{/if}{#if aaa != undefined}Obrázek vybrán ✔️{/if}
						<input name="file" type="file" accept="image/png, image/jpeg" bind:files={aaa} />
					</label>
					<button type="submit">Nahrát obrázek</button>
				</form>

				<img src={photosURL[0]} alt="" />
				<p>popisek:</p>
				{#if photos[0].id != undefined}
					<form action="?/photo" method="post">
						<textarea
							name="desc"
							maxlength="100"
							class="desc"
							value={photos.filter((a) => a.name === '1')[0].desc}
						/>
						<label
							>odkaz:
							<input name="url" type="url" />
						</label>
						<button formaction="?/photo">Potvrdit popisek a odkaz</button>
					</form>
				{/if}
			</div>
		</section>
	</div>
</body>
