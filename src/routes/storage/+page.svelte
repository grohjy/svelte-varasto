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
	import { search } from '$lib/stores.svelte.js';
	search.active = true;
	search.value = '';

	const { data }: { data: PageData } = $props();

	let storage = $derived.by(() => {
		return data.location.filter((c) => {
			const found = search.cleanedValues.every((value) => {
				let loc = `${c.rack}/${c.location}`.toLocaleLowerCase();
				return loc.includes(value);
			});
			return found;
		});
	});
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Storage:</h1>
				<!-- <div class="flex gap-2">
					<Input type="search" placeholder="Filter..." bind:value={search} />
				</div> -->
			</div>
			{#each storage as sto}
				<div class="flex flex-col gap-2 p-2 hover:bg-slate-50">
					<p class="text-sm font-medium leading-none hover:underline">
						<a href="/storage/{sto.id}">
							{sto.rack}/{sto.location}:
						</a>
					</p>
					{#each sto.inventory as inv}
						<div class="flex gap-2 p-2 hover:bg-slate-50">
							<Avatar.Root class="h-20 w-20  rounded-lg">
								<a href="/item/{inv.itemId}">
									<Avatar.Image src={inv.item?.thumb} alt="Thumbnail" />
									<Avatar.Fallback>{inv.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
								</a>
							</Avatar.Root>
							<div class="ml-4 grow space-y-1">
								<p class="text-sm font-medium leading-none hover:underline">
									<a href="/item/{inv.itemId}">
										item: {inv.item?.id}-{inv.item?.name}:
										{inv.qty - inv.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs
									</a>
								</p>
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
