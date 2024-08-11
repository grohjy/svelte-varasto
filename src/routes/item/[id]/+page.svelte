<script lang="ts">
	import GfCombobox from './../../../lib/components/gf-combobox.svelte';
	import { page } from '$app/stores';
	import GfContent from '$lib/components/gf-content.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { search } from '$lib/stores.svelte';
	search.active = false;
	search.value = '';

	let { data } = $props();
	let selectedStorage = $state();
	// let nbItems;
	let nbItems = $state();
	$effect(() => {
		nbItems = data.nbItems;
	});
	function jg() {
		console.log('jgg', $page.params.id);
	}
	// let dlgOpen: boolean = $state();
	// console.log('item2', search.value, search.active);
	function childText(itemCount, unitsCount, unit) {
		let nbItemsTemp = nbItems;
		if (itemCount == 0) {
			// console.log('aaa, ', itemCount, unitsCount);

			itemCount = 1;
			// unitsCount = 1;
			nbItemsTemp = 1;
		}
		let startStr = '';
		// let startStr = `${((itemCount * nbItems) / itemCount).toLocaleString('fi')} pcs: `;
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
		// item.unit=="g"?(item.unitsCount * nbItems) / item.itemCount} {item.unit}
	}
</script>

<div class="flex flex-col gap-2 overflow-auto">
	<div class="flex justify-between">
		<div class="flex">
			<Avatar.Root class="h-28 w-28 rounded-sm sm:h-56  sm:w-56">
				<Avatar.Image src={data.item?.thumb} alt="Thumbnail" />
				<Avatar.Fallback>{data.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
			<div class="ml-4 space-y-1 p-2">
				<p class="text-lg font-medium leading-none">{data.item?.name}</p>
				<p class="text-sm text-muted-foreground">{data.item?.type ? data.item?.type : '-'}</p>
			</div>
		</div>

		<Button variant="outline" href={`${$page.params.id}/edit`}>Edit</Button>
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Content</Card.Title>
		</Card.Header>
		<Card.Content>
			<GfContent content={data.item?.content} />
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Parents</Card.Title>
		</Card.Header>
		<Card.Content>
			{#if data.item?.parentItemsCount == 0}
				<p class="p-4 text-sm text-muted-foreground">No parents</p>
			{:else if data.item?.parentItems?.length == 0}
				<p class="p-4 text-sm text-muted-foreground">
					Too many parents, quantity: {data.item?.parentItemsCount}
				</p>
			{:else}
				{#each data.item?.parentItems as item}
					<a class="flex items-center p-4 hover:bg-slate-50" href={item.id}>
						<Avatar.Root class="h-12 w-12  rounded-sm">
							<Avatar.Image src={item.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<div class="ml-4 space-y-1">
							<p class="text-sm font-medium leading-none">{item.name}</p>
							<p class="text-sm text-muted-foreground">{item.type}</p>
						</div>
					</a>
				{/each}
			{/if}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<div class="flex items-center justify-between">
				<Card.Title>Children</Card.Title>
				{#if data.item?.childItems[0]}
					<div class="">
						<Label>Nb of items</Label>
						<Input
							type="number"
							placeholder="nb of items"
							bind:value={nbItems}
							class="w-28 text-end"
						/>
					</div>
				{/if}
			</div>
		</Card.Header>
		<Card.Content>
			{#if data.item?.childItems[0]}
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
						{#each data.item?.childItems as item}
							<tr class="hover:bg-slate-50">
								<td class=" p-2 text-sm font-medium text-gray-800">
									<a href="/item/{item.id}">
										<div class="flex flex-col items-center gap-2 sm:flex-row">
											<Avatar.Root class="h-12 w-12  rounded-sm">
												<Avatar.Image src={item.thumb} alt="Thumbnail" />
												<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
											</Avatar.Root>
											<div class=" space-y-1">
												<p class="text-sm font-medium leading-none">{item.id}-{item.name}</p>
												<p class="text-sm text-muted-foreground">{item.type}</p>
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
				<p class="p-4 text-sm text-muted-foreground">No children</p>
			{/if}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<div class="flex justify-between">
					Tasks
					<form method="post" action={`/task/create?/item`}>
						<input hidden name="item" value={$page.params.id} />
						<Button variant="outline" type="submit">Add</Button>
					</form>
				</div>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			{#each data.item?.tasks as task}
				<a class="flex items-center p-4 hover:bg-slate-50" href="/task/{task.id}">
					<div class="ml-4 space-y-1">
						<p class="text-sm font-medium leading-none">{task.id}-{task.name}</p>
						<p class="text-sm text-muted-foreground">Status: {task.status?.status}</p>
						<p class="text-sm text-muted-foreground">
							Type: {task.type?.type}/{task.type?.subtype}
						</p>
					</div>
				</a>
			{:else}
				<p class="p-4 text-sm text-muted-foreground">No tasks</p>
			{/each}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Inventory</Card.Title>
		</Card.Header>
		<Card.Content>
			{#each data.item?.inventory as inv, index}
				<div class="flex justify-between gap-2 p-4 hover:bg-slate-50">
					<!-- <div class="flex justify-between"> -->
					<div class="space-y-1">
						<div>
							<p class="text-sm font-medium">
								Location {inv.location?.rack}/{inv.location?.location}:
								{inv.inventoryRemove.reduce((sum, { qty }) => sum - qty, inv.qty)} pcs
							</p>
						</div>
						<div class="ml-4 grow space-y-2">
							<div>
								<div class="flex flex-col sm:flex-row sm:gap-2">
									<p class="text-sm font-medium">
										{inv.createdAt.toLocaleDateString('fi')}: {inv.qty} pcs
									</p>
									<!-- <p> -->
									<a href="/task/{inv.task?.id}" class="hover:underline">
										<p class="text-sm font-normal text-muted-foreground">
											(task: {inv.task?.id}-{inv.task?.name})
										</p>
									</a>
									<!-- </p> -->
								</div>
								{#if inv.info}
									<p class="text-sm font-normal text-muted-foreground">
										info: {inv.info}
									</p>
								{/if}
							</div>
							{#each inv.inventoryRemove as inv2}
								<div>
									<div class="flex flex-col sm:flex-row sm:gap-2">
										<p class="text-sm font-medium">
											{inv2.createdAt.toLocaleDateString('fi')}: {-inv2.qty} pcs
										</p>

										<p class="text-sm font-normal text-muted-foreground">
											(
											<a href="/task/{inv2.task?.id}" class="hover:underline"
												>task: {inv2.task?.id}-{inv2.task?.name}</a
											>,
											<a href="/item/{inv2.task?.itemId}" class="hover:underline"
												>item: {inv2.task?.itemId}-{inv2.task?.item?.name}</a
											>)
										</p>
									</div>
									{#if inv2.info}
										<p class="text-sm font-normal text-muted-foreground">
											info: {inv2.info}
										</p>
									{/if}
								</div>
							{/each}
						</div>
					</div>
					<div>
						<form method="POST" id="formjg" action="/inventory/move?item={inv.itemId}">
							<div class="flex flex-col items-end gap-2 sm:flex-row">
								<div class="grid max-w-32 gap-1">
									<Label for="location">Location</Label>
									<GfCombobox
										options={data.item?.storages
											.filter((s) => s.id != inv.locationId)
											.map((s) => ({
												value: s.id,
												label: `${s.rack}/${s.location}`
											}))}
										bind:selectedId={inv.selectedStorage}
									/>
								</div>
								<input type="hidden" name="storage" value={inv.selectedStorage} />
								<input type="hidden" name="inv" value={inv.id} />
								<!-- <div class="flex justify-end"> -->
								<Button variant="outline" type="submit">Move</Button>
								<!-- </div> -->
							</div>
						</form>
					</div>
				</div>
			{:else}
				<p class="p-4 text-sm text-muted-foreground">No inventory</p>
			{/each}
			{#if data.item?.closedInv.length != 0}
				<div>
					<p class="mt-4 p-4 text-base font-medium leading-none">Closed locations (4 newest):</p>
				</div>
				{#each data.item?.closedInv as inv}
					<div class="flex flex-col justify-between gap-2 p-4 hover:bg-slate-50 sm:flex-row">
						<div>
							<p class="text-sm font-medium">
								Location {inv.location?.rack}/{inv.location?.location}:
								{inv.inventoryRemove.reduce((sum, { qty }) => sum - qty, inv.qty)} pcs
							</p>
						</div>
						<div class="ml-4 grow space-y-2">
							<div>
								<p class=" text-sm font-medium">
									{inv.createdAt.toLocaleDateString('fi')}: {inv.qty} pcs
								</p>
								<p>
									<a href="/task/{inv.task?.id}" class="hover:underline">
										<span class="text-sm font-normal text-muted-foreground">
											(task: {inv.task?.id}-{inv.task?.name})
										</span>
									</a>
								</p>
								{#if inv.info}
									<p class="text-sm font-normal text-muted-foreground">info: {inv.info}</p>
								{/if}
							</div>

							{#each inv.inventoryRemove as inv2}
								<div>
									<p class="text-sm font-medium">
										{inv2.createdAt.toLocaleDateString('fi')}: {-inv2.qty} pcs
									</p>
									<p>
										<span class="text-sm font-normal text-muted-foreground">
											(
											<a href="/task/{inv2.task?.id}" class="hover:underline"
												>task: {inv2.task?.id}-{inv2.task?.name}</a
											>,
											<a href="/item/{inv2.task?.itemId}" class="hover:underline"
												>item: {inv2.task?.itemId}-{inv2.task?.item?.name}</a
											>)
										</span>
									</p>
									{#if inv2.info}
										<p class="text-sm font-normal text-muted-foreground">info: {inv2.info}</p>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<p class="p-4 text-sm text-muted-foreground">No closed locations</p>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
