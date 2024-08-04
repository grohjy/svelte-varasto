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
	let inventory = $derived.by(() => {
		return data.inventory.filter((c) => {
			let s = search.toLowerCase();
			return c.item?.name.toLowerCase().includes(s);
			//  ||
			// c.type?.subtype?.toLowerCase().includes(s) ||
			// c.task?.type?.type.toLowerCase().includes(s) ||
			// c.task?.type?.subtype.toLowerCase().includes(s)
		});
	});
	// console.log('looodata', JSON.stringify(data));
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Inventory:</h1>
				<div class="flex gap-2">
					<Input type="search" placeholder="Filter..." bind:value={search} />
					<!-- <Button variant="outline" href="customers/create">New</Button> -->
				</div>
			</div>
			{#each inventory as inv}
				<!-- <div class="grid grid-cols-2 gap-2 hover:bg-slate-50"> -->
				<div class="flex gap-2 p-2 hover:bg-slate-50">
					<a href="/item/{inv.itemId}">
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={inv.invs[0].item?.thumb} alt="Thumbnail" />
							<Avatar.Fallback
								>{inv.invs[0].item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback
							>
						</Avatar.Root>
					</a>
					<div class="ml-4 space-y-1">
						<a href="/item/{inv.itemId}">
							<p class="text-sm font-medium leading-none">
								item: {inv.invs[0].item?.id}-{inv.invs[0].item?.name}:
							</p>
							{#each inv.invs as inv2}
								<p class="text-sm font-medium leading-none">
									{inv2.location?.rack}/{inv2.location?.location}:
									{inv2.qty - inv2.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs
									<span class="text-sm font-normal text-muted-foreground">
										({inv2.createdAt.toLocaleDateString('fi')}, task: {inv2.task?.id}-{inv2.task
											?.name})
									</span>
								</p>
							{/each}
						</a>
						<!-- <a href="/task/{inv.task?.id}">
								<p class="text-sm text-muted-foreground">
									Location: {inv.location?.rack}/{inv.location?.location}
								</p>
							</a>
							<p class="text-sm text-muted-foreground">Info: {inv.info}</p> -->
					</div>
				</div>
				<!-- <div class="flex justify-between space-y-1 p-2">
						<div>
							<p class="text-sm font-medium leading-none">
								{inv.createdAt.toLocaleDateString('fi')}: {inv.qty}pcs
								<a href="/task/{inv.task?.id}" class="text-sm text-muted-foreground"
									>(task: {inv.task?.id}-{inv.task?.name})</a
								>
							</p>
							{#each inv.inventoryRemove as rem}
								<p class="text-sm font-medium leading-none">
									{rem.createdAt.toLocaleDateString('fi')}: {-rem.qty}pcs
									<a href="/task/{rem.task?.id}" class="text-sm text-muted-foreground"
										>(task: {rem.task?.id}-{rem.task?.name})</a
									>
								</p>
							{/each}
						</div>
						<form method="POST" action="?/remove">
							<div class="flex w-20 flex-col gap-2">
								<input type="hidden" name="inventory" value={inv.id} />
								<Input placeholder="qty" name="qty" bind:value={inv.tempqty} />
								<Button variant="outline" type="submit" disabled={!inv.tempqty}>Remove</Button>
							</div>
						</form>
					</div> -->
				<!-- </div> -->
			{/each}
		</div>
	</div>
</div>
