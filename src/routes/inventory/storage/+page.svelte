<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import GfEditor from '$lib/components/GfEditor.svelte';
	import { handleEditorImages } from '$lib/gfhelpers';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';

	const { data }: { data: PageData } = $props();
	let search = $state('');
	// let customers = $state();
	let storage = $derived.by(() => {
		return data.location.filter((c) => {
			let s = search.toLowerCase();
			let loc = `${c.rack}/${c.location}`.toLocaleLowerCase();
			return loc.includes(s);
		});
	});
	// console.log('looodata', JSON.stringify(data));
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Storage:</h1>
				<div class="flex gap-2">
					<Input type="search" placeholder="Filter..." bind:value={search} />
				</div>
			</div>
			{#each storage as sto}
				<div class="flex flex-col gap-2 p-2 hover:bg-slate-50">
					<a href="/inventory/storage/{sto.id}">
						<p class="text-sm font-medium leading-none">
							{sto.rack}/{sto.location}:
						</p>
					</a>
					{#each sto.inventory as inv}
						<div class="flex gap-2 p-2 hover:bg-slate-50">
							<a href="/item/{inv.itemId}">
								<Avatar.Root class="h-20 w-20  rounded-lg">
									<Avatar.Image src={inv.item?.thumb} alt="Thumbnail" />
									<Avatar.Fallback>{inv.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
							</a>
							<div class="ml-4 grow space-y-1">
								<a href="/item/{inv.itemId}">
									<p class="text-sm font-medium leading-none">
										item: {inv.item?.id}-{inv.item?.name}:
										{inv.qty - inv.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs
									</p>
								</a>
							</div>
						</div>
					{:else}
						<p class="text-sm font-normal text-muted-foreground">No items</p>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
