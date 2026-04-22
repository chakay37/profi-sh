<script lang="ts">
	import { onMount } from 'svelte';
	import { myDBInstance, get, del } from '$lib/db';
	import { goto } from '$app/navigation';
	import process from 'process';
	import { encode, decode } from 'js-base64';
	import Title from '$lib/components/Title.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import './style.scss';
	import PhotoAdminCard from '$lib/components/Photo-adminCard.svelte';

	export let data;
	let photosURL: string[] = [];
	//SF/4OVvE5KvU57QNjYz4y0IlMMx7IhhvFbFSO5WY

	let photos: object[] = [];
	let shops: object[] = [];
	let deals: object[] = [];
	let users: object[] = [];
	let cities: object[] = [];
	let selectDeals: object[] = [];
	let usersTable = '';
	let photosLoaded = false;

	onMount(async () => {
		if (data.authenticated == false) {
			goto('/admin');
		}

		/*photos = await get('photos');
		shops = await get('shops');
		deals = await get('deals');
		users = await get('users');
		cities = await get('cities');
		console.log(photos);
		console.log(shops);
		console.log(deals);
		console.log(users);
		console.log(cities);*/
		let allTables: Promise<any>[] = [];
		allTables = [
			myDBInstance.get('photos'),
			myDBInstance.get('shops'),
			myDBInstance.get('deals'),
			myDBInstance.get('users'),
			myDBInstance.get('cities')
		];
		const res = await Promise.all(allTables);
		console.log(res);
		photos = res[0];
		shops = res[1];
		deals = res[2];
		users = res[3];
		cities = res[4];
		const shopPhotosNames = [
			'decinPlzenska',
			'decinPrutah',
			'mladaBoleslav',
			'most',
			'pardubice',
			'pisek',
			'praha',
			'tabor',
			'teplice',
			'ustiNadLabem',
			'plzen'
		];

		let orderedPhotos = [];
		try {
			for (let i = 1; i < 6; i++) {
				const response = await fetch('/photos?name=' + i + '.jpg');
				if (!response.ok) {
					console.error('Failed to fetch photo:', i, response.status);
					continue;
				}
				const blob = await response.blob();
				//let photoOut = await response.json();

				//photosURL.push(URL.createObjectURL(blob));
				let photo = photos.filter((a) => a.name === i.toString())[0];
				photo.photoURL = URL.createObjectURL(blob);
				photo.type = 0;
				orderedPhotos.push(photo);
			}
			for (let i = 0; i < shopPhotosNames.length; i++) {
				const response = await fetch('/photos?name=' + shopPhotosNames[i] + '.jpg');
				const blob = await response.blob();
				//let photoOut = await response.json();

				//photosURL.push(URL.createObjectURL(blob));
				console.log(photos);
				console.log(shopPhotosNames[i]);
				let photo = photos.filter((a) => a.name === shopPhotosNames[i].toString())[0];
				photo.photoURL = URL.createObjectURL(blob);
				photo.type = 1;
				orderedPhotos.push(photo);
			}
		} catch (error) {
			console.error('Error loading images:', error);
		}
		//shopsArr = shops.map((shop: { [x: string]: object; }) => {return shop['name']})
		//photosURL = photosURL;

		photos = orderedPhotos;
		photosLoaded = true;

		deals = deals.sort(
			(a, b) =>
				Date.UTC(
					new Date(a.date).getFullYear(),
					new Date(a.date).getMonth(),
					new Date(a.date).getDate()
				) -
				Date.UTC(
					new Date(b.date).getFullYear(),
					new Date(b.date).getMonth(),
					new Date(b.date).getDate()
				)
		);
		deals = deals.slice(deals.length - 150);
		for (let index = 0; index < deals.length; index++) {
			if (
				deals[index].date != null &&
				deals[index].enddate != null &&
				deals[index].shopId != null
			) {
				let startDate = new Date(deals[index].date);
				let endDate = new Date(deals[index].enddate);

				let startDateStr = startDate.getDate() + '.' + (startDate.getMonth() + 1) + '.';
				let endDateStr = endDate.getDate() + '.' + (endDate.getMonth() + 1) + '.';

				for (let j = 0; j < shops.length; j++) {
					if (shops[j].id === deals[index].shopId) {
						deals[index].selectText = startDateStr + ' - ' + endDateStr + ' | ' + shops[j].name;
					}
				}
			}
		}
		usersTable = 'email;tel.cislo;město;datum' + '\n';
		console.log(users);
		users.forEach((u) => {
			let dateR = '';
			if (u.date_registered !== null) {
				let dateDate = u.date_registered.split('T')[0];
				let dateTime = u.date_registered.split('T')[1].split('.')[0];

				let year = dateDate.split('-')[0];
				let month = dateDate.split('-')[1];
				let day = dateDate.split('-')[2];

				let hour = Number(dateTime.split(':')[0]) + 3;
				let minute = dateTime.split(':')[1];

				dateR = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
			}
			usersTable +=
				u.email +
				';' +
				u.phone +
				';' +
				cities.find((c) => c.id == u.cityid).name +
				';' +
				dateR +
				'\n';
		});
	});

	function changeSelect(event: any) {
		if (dealToChange != null) {
			dealToChange.type = event.target.value;
		}
	}
	function dl_as_file_Blob(filename_to_dl: string, data_to_dl: string) {
		let blobx = new Blob([data_to_dl], { type: 'text/plain' }); // ! Blob
		let elemx = window.document.createElement('a');
		elemx.href = window.URL.createObjectURL(blobx); // ! createObjectURL
		elemx.download = filename_to_dl;
		elemx.style.display = 'none';
		document.body.appendChild(elemx);
		elemx.click();
		document.body.removeChild(elemx);
	}

	let dealType: number;
	let dealToChange: object | null;
	let showModal = false;
</script>

<div class="admin-page">
	<a href="./panel/dealsTableAdmin" target="_blank"
		><button class="secondary-button">Tabulka s akcemi</button></a
	>
	<section>
		<div class="card akce">
			<h1>Akce a slevy</h1>
			<form action="?/dealPost" method="post">
				<h3>Nová akce</h3>
				<label
					>Typ akce:
					<select name="type" bind:value={dealType}>
						<option value="0">Sleva (procenta)</option>
						<option value="1">Nové zboží</option>
						<option value="2">Sleva (koruny)</option>
						<option value="3">Svátek</option>
						<option value="4">Jiné</option>
						<option value="5">Zavřeno</option>
					</select>
				</label>
				{#if dealType == 0}
					<label
						>Hodnota slevy: (např. "40" %)
						<input type="number" name="value" required />
					</label>
				{/if}
				{#if dealType == 2}
					<label
						>Hodnota slevy: (např. "50" Kč)
						<input type="number" name="value" required />
					</label>
				{/if}
				<label
					>Výběr obchodu: (ctrl pro více obchodů)
					<select class="multiselect" multiple name="shops">
						{#each shops as shop}
							<option value={shop.id}>{shop.name}</option>
						{/each}
					</select>
				</label>
				<label
					>Akce OD:
					<input type="date" name="date" required />
				</label>
				<label
					>Akce DO:
					<input type="date" name="enddate" required />
				</label>
				<label>
					Důležitá:
					<input type="checkbox" name="priority" />
				</label>
				<label
					>Pár vět o akci:
					<textarea name="text" required></textarea>
				</label>
				<button type="submit">Přidat akci</button>
			</form>
		</div>
		<div class="card akce">
			<h1>Akce a slevy</h1>
			<h3>Změna akce</h3>
			<select bind:value={dealToChange}>
				{#each deals as deal}
					{#if deal.selectText != undefined}
						<option value={deal}>{deal.selectText}</option>
					{/if}
				{/each}
			</select>
			{#if dealToChange != null && dealToChange != undefined}
				<form action="?/dealPut" method="post">
					<input type="number" name="id" value={dealToChange.id} hidden />
					<label
						>Typ akce:
						<select name="type" on:change={changeSelect}>
							{#if Number(dealToChange.type.toString()) === 0}
								<option selected value="0">Sleva (procenta)</option>
							{:else}
								<option value="0">Sleva (procenta)</option>
							{/if}
							{#if Number(dealToChange.type.toString()) === 1}
								<option selected value="1">Nové zboží</option>
							{:else}
								<option value="1">Nové zboží</option>
							{/if}
							{#if Number(dealToChange.type.toString()) === 2}
								<option selected value="2">Sleva (koruny)</option>
							{:else}
								<option value="2">Sleva (koruny)</option>
							{/if}
							{#if Number(dealToChange.type.toString()) === 3}
								<option selected value="3">Svátek</option>
							{:else}
								<option value="3">Svátek</option>
							{/if}
							{#if Number(dealToChange.type.toString()) === 4}
								<option selected value="4">Jiné</option>
							{:else}
								<option value="4">Jiné</option>
							{/if}
							{#if Number(dealToChange.type.toString()) === 5}
								<option selected value="5">Zavřeno</option>
							{:else}
								<option value="5">Zavřeno</option>
							{/if}
						</select>
					</label>
					{#if dealToChange.type == 0}
						<label
							>Hodnota slevy: (např. "40" %)
							<input type="number" value={dealToChange.value} name="value" />
						</label>
					{/if}
					{#if dealToChange.type == 2}
						<label
							>Hodnota slevy: (např. "50" Kč)
							<input type="number" value={dealToChange.value} name="value" />
						</label>
					{/if}
					<label
						>Výběr obchodu:
						<select name="shopId">
							{#each shops as shop}
								{#if dealToChange.shopId === shop.id}
									<option selected value={shop.id}>{shop.name}</option>
								{:else}
									<option value={shop.id}>{shop.name}</option>
								{/if}
							{/each}
						</select>
					</label>
					<label
						>Akce OD:
						<input type="date" name="date" value={dealToChange.date.toString().split('T')[0]} />
					</label>
					<label
						>Akce DO:
						<input
							type="date"
							name="enddate"
							value={dealToChange.enddate.toString().split('T')[0]}
						/>
					</label>
					<label>
						Důležitá:
						{#if dealToChange.priority == 1}
							<input type="checkbox" name="priority" checked />
						{:else}
							<input type="checkbox" name="priority" />
						{/if}
					</label>
					<label
						>Pár vět o akci:
						<textarea name="text" value={dealToChange.text} required></textarea>
					</label>
					<button type="submit">Změnit akci</button>
					<button class="delete-deal" type="button" on:click={() => (showModal = true)}
						>Smazat akci</button
					>
				</form>
			{/if}
		</div>
		<div class="card">
			<h1>Stažení tabulky uživatelů</h1>
			{#if users.length > 0 && usersTable != ''}
				<p>Počet uživatelů: {users.length}</p>
				<button class="primary-button" on:click={() => dl_as_file_Blob('uzivatele.csv', usersTable)}
					>Stáhnout</button
				>
			{/if}
		</div>
		{#if photosLoaded && photos.length > 0}
			{#each photos as p}
				<PhotoAdminCard photo={p} />
			{/each}
		{/if}
	</section>
</div>
{#if dealToChange != null}
	<Modal bind:showModal bind:deals bind:dealToChange warning={true}>
		<h2 slot="header">Určitě smazat akci?</h2>
		{#if dealToChange != null}
			<p class="modal-body">
				Potvrzením se smaže akce: {shops.find((a) => a.id === dealToChange.shopId).name}, {dealToChange.date
					.toString()
					.split('T')[0]}
			</p>
		{/if}
	</Modal>
{/if}
