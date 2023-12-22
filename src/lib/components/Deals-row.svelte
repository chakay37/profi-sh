<script lang="ts">
    import type { Deals } from "$lib/models/models";

    export let weekend = false;
    export let shops: object[] = [];
    export let deals: Deals[] = [];
    export let date: string = '';
</script>

<style lang="scss">
    	$logo-color: #a7996b;
        $logo-color-dark: #8f8054;
        $logo-color-light: #b6a771;
        $white: #f1f1ee;
        
        .weekend-row {
			background-color: $logo-color;
		}
</style>

<tr class:weekend-row={weekend}>
    <th scope="row" class="head-dates">{date}</th>
    {#each shops as shop}
        <td>
            {#each deals as deal}
                {#if deal.dateStr == date && deal.shopId == shop.id}
                    {#if deal['type'] == 0}
                        -{deal['value']}%
                    {/if}
                    {#if deal['type'] == 1}
                        Nové zboží
                    {/if}
                    {#if deal['type'] == 2}
                        Vše za {deal['value']},- kč
                    {/if}
                    {#if deal['type'] == 3}
                        Nové zboží - Dětské
                    {/if}
                    
                {/if}
            {/each}
        </td>
    {/each}
</tr>