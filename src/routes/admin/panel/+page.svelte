<script lang="ts" >
	import { onMount } from 'svelte';
	import { get, del } from '$lib/db';
	import process from 'process';
	import { encode, decode } from 'js-base64';
	import Title from '$lib/components/Title.svelte';
	import { handleSubmit } from '$lib/photos.svelte';
	import Modal from '$lib/components/Modal.svelte';
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
	let deals: object[] = [];
	let users: object[] = [];
	let cities: object[] = [];
	let selectDeals: object[] = [];
	let usersTable = '';
	onMount(async () => {

		try {
			for (let i = 1; i < 6; i++) {
				const response = await fetch('https://file-upload-sh.s3.amazonaws.com/' + i + '.jpg');
				const blob = await response.blob();
				//let photoOut = await response.json();

				photosURL.push(URL.createObjectURL(blob));
			}
		} catch (error) {
			console.error('Error loading images:', error);
		}
		//shopsArr = shops.map((shop: { [x: string]: object; }) => {return shop['name']})
		photosURL = photosURL;
		photos = await get('photos');
		shops = await get('shops');
		deals = await get('deals');
		users = await get('users');
		cities = await get('cities');
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
		usersTable = 'email;tel.cislo;město'+'\n';
		users.forEach(u => {
			usersTable += u.email+';'+u.phone+';'+cities.find(c => c.id == u.cityid).name+'\n';
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

	let aaa: FileList;
	let dealType: number;
	let dealToChange: object | null;
	let showModal = false;
</script>

<body>
	<div class="admin-page">
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
						</select>
					</label>
					{#if dealType == 0}
						<label
							>Hodnota slevy: (např. "40" %)
							<input type="number" name="value" required/>
						</label>
					{/if}
					{#if dealType == 2}
						<label
							>Hodnota slevy: (např. "50" Kč)
							<input type="number" name="value" required />
						</label>
					{/if}
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
						<input type="date" name="date" required/>
					</label>
					<label
						>Akce DO:
						<input type="date" name="enddate" required/>
					</label>
					<label
						>Pár vět o akci:
						<textarea name="text" required/>
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
							<input type="number" name="id" value={dealToChange.id} hidden>
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
							<input type="date" name="enddate" value={dealToChange.enddate.toString().split('T')[0]} />
						</label>
						<label
							>Pár vět o akci:
							<textarea name="text" value={dealToChange.text} required/>
						</label>
						<button type="submit">Změnit akci</button>
						<button class="delete-deal" type="button" on:click={() => showModal = true}>Smazat akci</button>
					</form>
					
				{/if}
			</div>
			<div class="card">
				<h1>Stažení tabulky uživatelů</h1>
				{#if users.length > 0 && usersTable != ''}
					<p>Počet uživatelů: {users.length}</p>
					<button class="primary-button" on:click={() => dl_as_file_Blob('uzivatele.csv', usersTable)}>Stáhnout</button>
				{/if}
				
			</div>
			<div class="card">
				<h1>Kolotoč obrázek 1</h1>
				<form on:submit|preventDefault={SubmitFirst}>
					<label class="imageSelector primary-button"
						>{#if aaa == undefined}
							Změnit obrázek
						{/if}{#if aaa != undefined}Obrázek vybrán ✔️{/if}
						<input name="file" type="file" accept="image/png, image/jpeg" bind:files={aaa} />
					</label>
					<button type="submit">Nahrát obrázek</button>
				</form>

				<img src={photosURL[0]} alt="" />
				<div class="desc-form">
				<p>popisek:</p>
				{#if photos[0].id != undefined}
					<form  action="?/photo" method="post">
						<textarea
							name="desc"
							maxlength="100"
							class="desc"
							value={photos.filter((a) => a.name === '1')[0].desc}
						/>
						<label
							>odkaz:
							<input name="url" type="url" value={photos.filter((a) => a.name === '1')[0].url} />
						</label>
						<button formaction="?/photo">Potvrdit popisek a odkaz</button>
					</form>
				{/if}
				</div>
			</div>
		</section>
	</div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.1447.0/aws-sdk.min.js"></script>
</body>
{#if dealToChange != null}
<Modal bind:showModal bind:deals bind:dealToChange warning={true}>
	<h2 slot="header">Určitě smazat akci?</h2>
	{#if dealToChange != null}
		<p class="modal-body">Potvrzením se zmaže akce: {shops.find(a => a.id === dealToChange.shopId).name}, {dealToChange.date.toString().split('T')[0]}</p>
	{/if}
</Modal>
{/if}
