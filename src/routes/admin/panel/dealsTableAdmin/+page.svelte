<script>
	import DealsTable from '$lib/components/DealsTable.svelte';
</script>
<div class="table-container-admin">
	<a href="../"><button class="secondary-button">Zpět na hlavní admin stránku</button></a>
<DealsTable days={56}></DealsTable>
</div>
<style>
	.table-container-admin {
			margin: 50px auto;
			width: 80%;
	}
</style>