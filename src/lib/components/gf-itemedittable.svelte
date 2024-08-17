<script lant="ts">
	import GfItemeditcombobox from './gf-itemeditcombobox.svelte';
	import * as Card from '$lib/components/ui/card';
	import GfCombobox from './gf-combobox.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import GfItemeditrow from './gf-itemeditrow.svelte';
	import { Button } from '$lib/components/ui/button/index';

	let { items = $bindable(), allItems, parent = false } = $props();
	let newItem = $state({
		id: undefined,
		itemCount: 1,
		unitsCount: 0,
		unit: 'pcs'
	});
	// console.log('swa', allItems);

	let filteredSelParents = $derived(
		allItems.filter((item) => {
			const ids = items.map((item) => item.id);
			// ids?.push(data.item.id);

			return !ids.includes(item.id);
		})
	);
	// console.log('filltereed');
	// );

	let parents = $derived(
		filteredSelParents.map(({ id, name, type }) => {
			return {
				value: id,
				label: `${name} (${type})`
			};
		})
	);
	function add() {
		console.log('jgg', newItem);
		// console.log('jgg', allItems);
		let addItem = allItems.find((item) => {
			return item.id == newItem.id;
		});
		addItem = { ...addItem, ...newItem };
		console.log('additee', addItem);
		items.push(addItem);
		newItem = {
			id: undefined,
			itemCount: 1,
			unitsCount: 0,
			unit: 'pcs'
		};
	}
	function del(index) {
		// console.log('del', e);
		items.splice(index, 1);
	}
</script>

<Card.Root class=" w-full ">
	<!-- <Card.Header>
		<Card.Title>Parents:</Card.Title>
	</Card.Header> -->
	<Card.Content>
		<div class="space-y-4">
			{#each items as item, index}
				<div class="grid grid-cols-6 items-end gap-2 p-4 hover:bg-slate-50">
					<GfItemeditrow {item} class="col-span-5" {parent} />
					<Button variant="ghost" onclick={() => del(index)}>Del</Button>
				</div>
			{/each}
			<div class="grid grid-cols-6 items-end gap-2 p-4 hover:bg-slate-50">
				<GfItemeditcombobox bind:item={newItem} options={parents} class="col-span-5" {parent} />
				<Button variant="ghost" onclick={add} disabled={!newItem.id}>Add</Button>
			</div>
		</div>
	</Card.Content>
</Card.Root>
