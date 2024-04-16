<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
	import './login.scss';
    export let data;

    onMount(async () => {
        if(data.authenticated == true) {
            goto('/editor/articles');
        }
    })
    
</script>

<main>
	<div class="login-card">
		<form action="?/login" method="post">
			<h1>Přihlášení do editace článků</h1>
			<label
				>Heslo:
				<input name="password" type="text" />
			</label>
			<button type="submit" class="primary-button">Přihlášit</button>
		</form>
	</div>
</main>
