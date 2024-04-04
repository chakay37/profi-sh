<script lang="ts">
    import { handleSubmit } from '$lib/photos.svelte';
    let aaa: FileList;
	
    export let photo: object|null;

    const Submit = async (e: SubmitEvent) => {
        if (photo != null) {
		await handleSubmit(e, photo.name);
        const formData = new FormData(e.target as HTMLFormElement);
		const file = formData.get('file') as Blob;
        photo.photoURL = URL.createObjectURL(file);
        }
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
    <img src="{photo.photoURL}" alt="" />
    {#if photo.type == 0}
    <div class="desc-form">
    <p>popisek:</p>
    {#if photo.id != undefined}
        <form  action="?/photo" method="post">
            <input hidden type="number" name="id" value={photo.id}>
            <textarea
                name="desc"
                maxlength="100"
                class="desc"
                value={photo.desc}
            />
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