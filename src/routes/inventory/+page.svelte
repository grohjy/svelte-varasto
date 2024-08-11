<script lang="ts">
	import { search } from '$lib/stores.svelte';
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
	let inventory = $derived.by(() => {
		return data.inventory.filter((c) => {
			const found = search.cleanedValues.every((value) => {
				return c.invs[0].item?.name.toLowerCase().includes(value);
			});

			return found;
		});
	});
	// console.log('looodata', JSON.stringify(data));
	search.active = true;
	search.value = '';
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Inventory:</h1>
				<div class="flex gap-2">
					<!-- <Input type="search" placeholder="Filter..." bind:value={search.value} /> -->
					<Button variant="outline" href="/inventory/create">Add</Button>
				</div>
			</div>
			{#each inventory as inv}
				<div class="flex justify-between hover:bg-slate-50">
					<div class="flex flex-col gap-2 sm:flex-row">
						<div>
							<a href="/item/{inv.itemId}">
								<Avatar.Root class="h-20 w-20  rounded-sm">
									<Avatar.Image src={inv.invs[0].item?.thumb} alt="Thumbnail" />
									<Avatar.Fallback
										>{inv.invs[0].item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback
									>
								</Avatar.Root>
							</a>
						</div>
						<div>
							<div class=" grow space-y-1">
								<p class=" text-sm font-medium leading-none hover:underline">
									<a href="/item/{inv.itemId}">
										{inv.invs[0].item?.id}-{inv.invs[0].item?.name}:
									</a>
								</p>
								{#each inv.invs as inv2}
									<p class="text-sm font-medium leading-none">
										<a class="hover:underline" href="/storage/{inv2.location?.id}">
											{inv2.location?.rack}/{inv2.location?.location}:
										</a>
										{inv2.qty - inv2.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs
										<span class="text-sm font-normal text-muted-foreground">
											({inv2.createdAt.toLocaleDateString('fi')}, task: {inv2.task?.id}-{inv2.task
												?.name})
										</span>
									</p>
								{/each}
							</div>
						</div>
					</div>
					<div>
						<Button class=" " variant="outline" href="inventory/remove?item={inv.itemId}"
							>Remove</Button
						>
					</div>
				</div>
			{/each}
		</div>
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Recently closed:</h1>
			</div>
			{#each data.closedInv as inv}
				<div class="flex gap-2 p-2 hover:bg-slate-50">
					<a href="/item/{inv.itemId}">
						<Avatar.Root class="h-20 w-20  rounded-sm">
							<Avatar.Image src={inv.item?.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{inv.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</a>
					<div class="ml-4 grow space-y-1">
						<p class="text-sm font-medium leading-none hover:underline">
							<a href="/item/{inv.itemId}">
								Item: {inv.item?.id}-{inv.item?.name}, {inv.location?.rack}/{inv.location.location}:
							</a>
						</p>
						<p class="text-sm font-normal text-muted-foreground">
							{inv.createdAt.toLocaleDateString('fi')} (task: {inv.task?.id}-{inv.task?.name}): {inv.qty}
							pcs
						</p>

						{#each inv.inventoryRemove as inv2}
							<p class="text-sm font-normal text-muted-foreground">
								{inv2.createdAt.toLocaleDateString('fi')} (task: {inv2.task?.id}-{inv2.task?.name}): {-inv2.qty}
								pcs
							</p>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
