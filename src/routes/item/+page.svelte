<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index';
	import { search } from '$lib/stores.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	search.active = false;
	search.value = '';
</script>

<div class="prose">
	<h1>Products:</h1>
	<form method="post" action={`${$page.url}/create`}>
		<Button type="submit" variant="outline">Create</Button>
	</form>
	{#each data.items.filter((i) => i.type === 'product') as item}
		<a href="item/{item.id}">
			<h2>{item.name}</h2>
		</a>
		<pre>{JSON.stringify(item.childItems, null, 2)}</pre>
	{/each}
	<h1>Plastics:</h1>
	{#each data.items.filter((i) => i.type === 'plastic') as item}
		<pre>{JSON.stringify(item, null, 2)}</pre>
	{/each}
</div>
