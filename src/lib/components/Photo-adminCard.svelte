<script lang="ts">
	let aaa: FileList;

	export let photo: any | null;

	const Submit = async (e: SubmitEvent) => {
		e.preventDefault();

		if (!photo) return;

		const formData = new FormData(e.target as HTMLFormElement);

		const file = formData.get('file') as Blob;

		const jpgBlob = await compress(file, {
			quality: 0.8,
			type: 'image/jpeg'
		});

		await fetch('/photos', {
			method: 'POST',
			body: jpgBlob
		});

		photo.photoURL = URL.createObjectURL(file);
	};
</script>

<div class="card">
	{#if photo != null}
		{#if photo.type == 0}
			<h1>Kolotoč obrázek: {photo.name}</h1>
		{/if}
		{#if photo.type == 1}
			<h1>Obrázek obchodu: {photo.name}</h1>
		{/if}
		<form on:submit|preventDefault={Submit}>
			<label class="imageSelector primary-button"
				>{#if aaa == undefined}
					Změnit obrázek
				{/if}{#if aaa != undefined}Obrázek vybrán ✔️{/if}
				<input name="file" type="file" accept="image/png, image/jpeg" bind:files={aaa} />
			</label>
			<button type="submit">Nahrát obrázek</button>
		</form>
		<img src={photo.photoURL} alt="" />
		{#if photo.type == 0}
			<div class="desc-form">
				<p>popisek:</p>
				{#if photo.id != undefined}
					<form action="?/photo" method="post">
						<input hidden type="number" name="id" value={photo.id} />
						<textarea name="desc" maxlength="100" class="desc" value={photo.desc} />
						<label
							>odkaz:
							<input name="url" type="url" value={photo.url} />
						</label>
						<button formaction="?/photo">Potvrdit popisek a odkaz</button>
					</form>
				{/if}
			</div>
		{/if}
	{/if}
</div>
