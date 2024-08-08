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
	search.active = false;
	search.value = '';

	const { data }: { data: PageData } = $props();
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">
					Storage {data.location?.rack}/{data.location?.location}:
				</h1>
			</div>
			{#each data.location?.inventory as inv}
				<div class="flex gap-2 p-2 hover:bg-slate-50">
					<Avatar.Root class="h-20 w-20  rounded-lg">
						<a href="/item/{inv.itemId}">
							<Avatar.Image src={inv.item?.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{inv.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</a>
					</Avatar.Root>
					<div class="ml-4 space-y-1">
						<p class=" flex justify-between gap-2 text-sm font-medium leading-none hover:underline">
							<a href="/item/{inv.itemId}">
								Item: {inv.item?.id}-{inv.item?.name}:
								<span
									>{inv.qty - inv.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs</span
								>
							</a>
						</p>
						<p class="flex justify-between gap-2 text-sm font-normal text-muted-foreground">
							{inv.createdAt.toLocaleDateString('fi')}, task: {inv.task?.id}-{inv.task?.name} ({inv.itemId}-{inv
								.item.name}):
							<span> {inv.qty} pcs </span>
						</p>
						{#each inv.inventoryRemove as inv2}
							<p class="flex justify-between gap-2 text-sm font-normal text-muted-foreground">
								{inv2.createdAt.toLocaleDateString('fi')}, task: {inv2.task?.id}-{inv2.task?.name} ({inv2.itemId}-{inv2
									.item.name}):
								<span>
									{-inv2.qty} pcs
								</span>
							</p>
						{/each}
					</div>
				</div>
			{:else}
				<p class="text-sm font-normal text-muted-foreground">No items</p>
			{/each}
		</div>

		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Recently closed:</h1>
			</div>
			{#each data.closedInvs?.inventory as inv}
				<div class="flex gap-2 p-2 hover:bg-slate-50">
					<Avatar.Root class="h-20 w-20  rounded-lg">
						<a href="/item/{inv.itemId}">
							<Avatar.Image src={inv.item?.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{inv.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</a>
					</Avatar.Root>
					<div class="ml-4 space-y-1">
						<p class=" flex justify-between gap-2 text-sm font-medium leading-none hover:underline">
							<a href="/item/{inv.itemId}">
								Item: {inv.item?.id}-{inv.item?.name}:
								<span
									>{inv.qty - inv.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs</span
								>
							</a>
						</p>
						<p class="flex justify-between gap-2 text-sm font-normal text-muted-foreground">
							{inv.createdAt.toLocaleDateString('fi')}, task: {inv.task?.id}-{inv.task?.name} ({inv.itemId}-{inv
								.item.name}):
							<span> {inv.qty} pcs </span>
						</p>
						{#each inv.inventoryRemove as inv2}
							<p class="flex justify-between gap-2 text-sm font-normal text-muted-foreground">
								{inv2.createdAt.toLocaleDateString('fi')}, task: {inv2.task?.id}-{inv2.task?.name} ({inv2.itemId}-{inv2
									.item?.name}):
								<span>
									{-inv2.qty} pcs
								</span>
							</p>
						{/each}
					</div>
				</div>
			{:else}
				<p class="text-sm font-normal text-muted-foreground">No items</p>
			{/each}
		</div>
	</div>
</div>
