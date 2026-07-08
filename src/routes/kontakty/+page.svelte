<script lang="ts">
	import './kontakty.scss';
	import Title from '$lib/components/Title.svelte';
</script>

<div class="kontakty-page">
	<section>
		<div class="title"><Title>Kontakty</Title></div>
		<table>
			<tbody>
				<tr>
					<th>e-mail</th>
					<td>info@profi-sh.cz</td>
				</tr>
				<tr>
					<th>facebook</th>
					<td
						><a target="_blank" href="https://www.facebook.com/profisecondhand"
							>www.facebook.com/profisecondhand</a
						></td
					>
				</tr>
				<tr>
					<th>instagram</th>
					<td
						><a target="_blank" href="https://www.instagram.com/profi_second_hand/"
							>www.instagram.com/profi_second_hand</a
						></td
					>
				</tr>
			</tbody>
		</table>
	</section>
</div>
