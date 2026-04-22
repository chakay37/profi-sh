<script lang="ts">
	import imageCompression from 'browser-image-compression';
	let aaa: FileList;

	export let photo: any | null;

	const Submit = async (e: SubmitEvent) => {
		e.preventDefault();

		if (!photo) return;

		const formData = new FormData(e.target as HTMLFormElement);
		const file = formData.get('file') as File;

		const blob = await imageCompression(file, {
			maxSizeMB: 0.1,
			fileType: 'image/jpeg'
		});

		formData.delete('file');
		formData.append('file', blob);

		await fetch('/photos', {
			method: 'POST',
			body: formData
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
			<input type="hidden" name="name" value={photo.name} />
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
						<textarea name="desc" maxlength="100" class="desc" value={photo.desc}></textarea>
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
