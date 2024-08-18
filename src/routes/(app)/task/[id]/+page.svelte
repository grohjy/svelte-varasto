<script lang="ts">
	import { page } from '$app/stores';
	import GfContent from '$lib/components/gf-content.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { search } from '$lib/stores.svelte.js';
	search.active = false;
	search.value = '';

	let { data } = $props();
	let nbItems = $state();
	$effect(() => {
		nbItems = data.task?.qty;
	});
	function childText(itemCount, unitsCount, unit) {
		let nbItemsTemp = nbItems;
		if (itemCount == 0) {
			itemCount = 1;
			nbItemsTemp = 1;
		}
		let startStr = '';
		let endStr;
		let totalUnits = (unitsCount * nbItemsTemp) / itemCount;
		if (unit == 'g' && totalUnits > 1000) {
			const nb = Math.round((totalUnits / 1000 + Number.EPSILON) * 10) / 10;
			endStr = `${nb.toLocaleString('fi')} kg`;
		} else if (unit == 's' && totalUnits >= 60) {
			const nb = Math.round((totalUnits / 3600 + Number.EPSILON) * 10) / 10;
			endStr = `${nb.toLocaleString('fi')} h`;
		} else {
			const nb = Math.round((totalUnits + Number.EPSILON) * 100) / 100;
			endStr = `${nb.toLocaleString('fi')} ${unit}`;
		}
		return `${startStr}${endStr}`;
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between">
		<div class="flex">
			<Avatar.Root class="h-28 w-28 rounded-sm sm:h-56  sm:w-56">
				<Avatar.Image src={data.task?.item?.thumb} alt="Thumbnail" />
				<Avatar.Fallback>{data.task?.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>

			<div class="ml-4 space-y-1 p-2">
				<p class="text-lg font-medium leading-none">
					Task: {data.task?.id} - {data.task?.name} (<a
						href="/item/{data.task?.itemId}"
						class="hover:underline">{data.task?.itemId} - {data.task?.item?.name}</a
					>)
				</p>
				<p class="text-sm text-muted-foreground">Status: {data.task?.status?.status}</p>
				<p class="text-sm text-muted-foreground">
					Type: {data.task?.type?.type}/{data.task?.type?.subtype}
				</p>
				<p class="text-sm text-muted-foreground">
					Date: {data.task?.startDate?.toLocaleDateString('fi')} - {data.task?.endDate?.toLocaleDateString(
						'fi'
					)}
					({(data.task?.endDate - data.task?.startDate) / (24 * 60 * 60 * 1000) + 1} days)
				</p>
			</div>
		</div>

		<Button variant="outline" href={`${$page.params.id}/edit`}>Edit</Button>
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Content</Card.Title>
		</Card.Header>
		<Card.Content>
			<!-- {#if data.task?.content} -->
			<GfContent content={data.task?.content} />
			<!-- {:else}
				<p>No content</p>
			{/if} -->
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<div class="flex items-center justify-between">
				<Card.Title>Children / Recipe</Card.Title>
				{#if data.task?.childItems[0] && data.task?.qty != 0}
					<div class="">
						<p class="text-sm font-medium leading-none">
							Qty: {nbItems}pcs
						</p>

						<!-- <Label>Nb of items</Label>
						<Input
							type="number"
							placeholder="nb of items"
							bind:value={nbItems}
							class="w-28 text-end"
						/> -->
					</div>
				{/if}
			</div>
		</Card.Header>
		<Card.Content>
			{#if data.task?.childItems[0]}
				<table class="w-full divide-y divide-gray-200">
					<thead>
						<tr>
							<th scope="col" class="p-2 text-start text-xs font-medium uppercase text-gray-500"
								>Item</th
							>
							<th scope="col" class="p-2 text-end text-xs font-medium uppercase text-gray-500"></th>
							<th scope="col" class="p-2 text-end text-xs font-medium uppercase text-gray-500"
								>Total</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each data.task?.childItems as item}
							<tr class="hover:bg-slate-50">
								<td class=" p-2 text-sm font-medium text-gray-800">
									<a href="/item/{item.childId}">
										<div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
											<Avatar.Root class="h-12 w-12  rounded-sm">
												<Avatar.Image src={item.child.thumb} alt="Thumbnail" />
												<Avatar.Fallback
													>{item.child.name?.substring(0, 3).toUpperCase()}</Avatar.Fallback
												>
											</Avatar.Root>
											<div class=" space-y-1">
												<p class="text-sm font-medium leading-none">
													{item.child.id}-{item.child.name}
												</p>
												<p class="text-sm text-muted-foreground">
													{item.child.type?.type}/{item.child.type?.subtype}
												</p>
											</div>
										</div>
									</a>
								</td>
								{#if item.unitsCount != 0}
									<td class=" p-2 text-end text-sm text-gray-800"
										>{item.itemCount}pcs / {item.unitsCount}{item.unit}</td
									>
									<td class="whitespace-nowrap p-2 text-end text-sm text-gray-800">
										{childText(item.itemCount, item.unitsCount, item.unit)}</td
									>
								{:else}
									<td></td>
									<td></td>
									<!-- <td class=" p-2 text-end text-sm text-gray-800"></td>
									<td class="whitespace-nowrap p-2 text-end text-sm text-gray-800"></td> -->
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<p class="p-4 text-sm text-muted-foreground">No children / recipe</p>
			{/if}
		</Card.Content>
		<Card.Footer class="justify-end gap-2 pt-2">
			<Button variant="outline" href="/copyrecipe?task={data.task?.id}">Copy recipe</Button>
		</Card.Footer>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title
				><div class="flex justify-between">
					<span>Actions</span>

					{#if !(data.task?.status?.status == 'done')}
						<Button variant="outline" href="/action/create?task={data.task?.id}">Add</Button>
					{:else}
						<Button variant="outline" disabled>Add</Button>
					{/if}
				</div></Card.Title
			>
		</Card.Header>
		<Card.Content>
			{#if data.task?.actions.length == 0}
				<p class="p-4">No actions</p>
			{:else}
				{#each data.task?.actions as action}
					<div class="mb-4 ml-4 space-y-1">
						<p class="text-sm font-medium leading-none">
							{action.createdAt.toLocaleDateString('fi')}, {action.createdAt.toLocaleTimeString(
								'fi',
								{
									timeStyle: 'short'
								}
							)} /
							<a href="/user/{action.user?.id}" class="hover:underline">{action.user?.shortname}</a
							>:
							{#if action.type?.type == 'work'}
								{action.qty}h
							{:else if action.type?.type == 'purchase'}
								{action.qty}€
							{:else if action.type?.type == 'inspection'}
								{action.qty}pcs
							{/if}

							{action.type?.type}/{action.type?.subtype}
						</p>
						{#if action.info}
							<p class="text-sm text-muted-foreground">Info: {action.info}</p>
						{/if}
					</div>
				{/each}
			{/if}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title
				><div class="flex justify-between">
					<span>Inventory</span>
				</div>
			</Card.Title>
		</Card.Header>
		<Card.Content class="">
			<div class="flex justify-between p-4">
				<div class="">
					<p class="mb-2 text-base font-medium">Has added items to inventory:</p>
					{#if data.task?.inventory.length == 0}
						<p>Nothing added to inventory</p>
					{:else}
						{#each data.task?.inventory as inv}
							<div class="">
								<p class="text-sm font-medium">
									{inv.createdAt.toLocaleDateString('fi')}:
									{inv.location?.rack}/{inv.location?.location},
									{inv.qty} pcs
								</p>
								{#if inv.info}
									<p class="text-sm text-muted-foreground">Info: {inv.info}</p>
								{/if}
							</div>
						{/each}
					{/if}
				</div>
				<Button variant="outline" href="/inventory/create?task={data.task?.id}">Add</Button>
			</div>
			<div class="flex justify-between p-4">
				<p class="mb-4 text-base font-medium leading-none">Has removed items from inventory:</p>
				<Button variant="outline" href="/inventory/remove?task={data.task?.id}">Remove</Button>
			</div>
			<div class="p-4">
				{#if data.task?.inventoryRemove.length == 0}
					<p>Nothing removed from inventory</p>
				{:else}
					{#each data.task?.inventoryRemove as invRemove}
						<div class="flex items-center gap-2 hover:bg-slate-50">
							<Avatar.Root class="h-20 w-20  rounded-sm">
								<Avatar.Image src={invRemove.item?.thumb} alt="Thumbnail" />
								<Avatar.Fallback
									>{invRemove.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback
								>
							</Avatar.Root>
							<div class="flex flex-col space-y-2">
								<div class="mb-4 space-y-1">
									<p class="text-sm font-medium">
										{invRemove.createdAt.toLocaleDateString('fi')}:
										<!-- {invRemove.location?.rack}/{invRemove.location?.location}, -->
										{invRemove.qty} pcs
										<span class="text-sm text-muted-foreground">
											<a href="/item/{invRemove.item?.id}" class="hover:underline"
												>(item: {invRemove.item?.id}-{invRemove.item?.name})</a
											></span
										>
									</p>
									{#if invRemove.info}
										<p class="text-sm text-muted-foreground">Info: {invRemove.info}</p>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
			<!-- </div> -->
		</Card.Content>
	</Card.Root>
</div>
