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

	let { data } = $props();
	let selectedStorage = $state();

	function jg() {
		console.log('jgg', $page.params.id);
	}
	let dlgOpen: boolean = $state();
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between">
		<div class="flex items-center p-2 hover:bg-slate-50">
			<Avatar.Root class="h-20 w-20  rounded-lg">
				<Avatar.Image src={data.item.thumb} alt="Thumbnail" />
				<Avatar.Fallback>{data.item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">{data.item.name}</p>
				<p class="text-sm text-muted-foreground">{data.item.type ? data.item.type : '-'}</p>
			</div>
		</div>

		<Button variant="outline" href={`${$page.params.id}/edit`}>Edit</Button>
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Content</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			<GfContent content={data.item.content} />
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Parents</Card.Title>
		</Card.Header>
		<Card.Content class=" pt-6">
			{#if data.item?.parentItemsCount == 0}
				<p>No parents</p>
			{:else if data.item?.parentItems?.length == 0}
				<p>Too many parents, quantity: {data.item?.parentItemsCount}</p>
			{:else}
				{#each data.item?.parentItems as item}
					<a class="flex items-center p-2 hover:bg-slate-50" href={item.id}>
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={item.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<div class="ml-4 space-y-1">
							<p class="text-sm font-medium leading-none">{item.name}</p>
							<p class="text-sm text-muted-foreground">{item.type ? item.type : '-'}</p>
						</div>
						<div class="ml-4 space-y-1">
							<span>{item.itemCount}</span>
							<span>{item.unitsCount}</span>
							<span>{item.unit}</span>
						</div>
					</a>
				{/each}
			{/if}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Children</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			{#if data.item?.childItems?.length == 0}
				<p>No children</p>
			{:else}
				{#each data.item?.childItems as item}
					<a class="flex items-center p-2 hover:bg-slate-50" href={item.id}>
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={item.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<div class="ml-4 space-y-1">
							<p class="text-sm font-medium leading-none">{item.name}</p>
							<p class="text-sm text-muted-foreground">{item.type ? item.type : '-'}</p>
						</div>
						<div class="ml-4 space-y-1">
							<span>{item.itemCount}</span>
							<span>{item.unitsCount}</span>
							<span>{item.unit}</span>
						</div>
					</a>
				{/each}
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
		<Card.Content class="pt-6">
			{#if data.item?.tasks.length == 0}
				<p>No tasks</p>
			{:else}
				{#each data.item?.tasks as task}
					<a class="flex items-center p-2 hover:bg-slate-50" href="/task/{task.id}">
						<div class="ml-4 space-y-1">
							<p class="text-sm font-medium leading-none">{task.id}-{task.name}</p>
							<p class="text-sm text-muted-foreground">Status: {task.status?.status}</p>
							<p class="text-sm text-muted-foreground">
								Type: {task.type?.type}/{task.type?.subtype}
							</p>
						</div>
					</a>
				{/each}
			{/if}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Inventory</Card.Title>
		</Card.Header>
		<Card.Content class=" pt-6">
			{#each data.item?.inventory as inv}
				<div class="flex justify-between gap-2 p-2 hover:bg-slate-50">
					<!-- <div class="flex justify-between"> -->
					<div>
						<div>
							<p class="text-sm font-medium leading-none">
								Location {inv.location?.rack}/{inv.location?.location}:
								{inv.inventoryRemove.reduce((sum, { qty }) => sum - qty, inv.qty)} pcs
							</p>
						</div>
						<div class="ml-4 grow space-y-1">
							<p class="text-sm font-medium leading-none">
								{inv.createdAt.toLocaleDateString('fi')}: {inv.qty} pcs
								<!-- {inv2.qty - inv2.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs -->
								<a href="/task/{inv.task?.id}">
									<span class="text-sm font-normal text-muted-foreground">
										(task: {inv.task?.id}-{inv.task?.name})
									</span>
								</a>
							</p>
							{#if inv.info}
								<p class="text-sm font-normal text-muted-foreground">info: {inv.info}</p>
							{/if}
							{#each inv.inventoryRemove as inv2}
								<p class="text-sm font-medium leading-none">
									{inv2.createdAt.toLocaleDateString('fi')}: {-inv2.qty} pcs
									<a href="/task/{inv2.task?.id}">
										<span class="text-sm font-normal text-muted-foreground">
											(task: {inv2.task?.id}-{inv2.task?.name})
										</span>
									</a>
								</p>
								{#if inv2.info}
									<p class="text-sm font-normal text-muted-foreground">info: {inv2.info}</p>
								{/if}
							{/each}
						</div>
					</div>
					<div>
						<form method="POST" id="formjg" action="/inventory/move?item={inv.itemId}">
							<div class="flex items-end gap-2">
								<GfCombobox
									options={data.item?.storages.map((s) => ({
										value: s.id,
										label: `${s.rack}/${s.location}`
									}))}
									bind:selectedId={selectedStorage}
								/>
								<input type="hidden" name="storage" value={selectedStorage} />
								<input type="hidden" name="inv" value={inv.id} />
								<!-- <div class="flex justify-end"> -->
								<Button variant="outline" type="submit">Move</Button>
								<!-- </div> -->
							</div>
						</form>
					</div>
				</div>
			{/each}

			<div>
				<p class="mt-4 text-sm font-medium leading-none">Closed locations (4 newest):</p>
			</div>
			{#each data.item?.closedInv as inv}
				<div class="flex justify-between gap-2 p-2 hover:bg-slate-50">
					<div>
						<p class="text-sm font-medium leading-none">
							Location {inv.location?.rack}/{inv.location?.location}:
							{inv.inventoryRemove.reduce((sum, { qty }) => sum - qty, inv.qty)} pcs
						</p>
					</div>
					<div class="ml-4 grow space-y-1">
						<p class="text-sm font-medium leading-none">
							{inv.createdAt.toLocaleDateString('fi')}: {inv.qty} pcs
							<!-- {inv2.qty - inv2.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0)} pcs -->
							<a href="/task/{inv.task?.id}">
								<span class="text-sm font-normal text-muted-foreground">
									(task: {inv.task?.id}-{inv.task?.name})
								</span>
							</a>
						</p>
						{#if inv.info}
							<p class="text-sm font-normal text-muted-foreground">info: {inv.info}</p>
						{/if}

						{#each inv.inventoryRemove as inv2}
							<p class="text-sm font-medium leading-none">
								{inv2.createdAt.toLocaleDateString('fi')}: {-inv2.qty} pcs
								<a href="/task/{inv2.task?.id}">
									<span class="text-sm font-normal text-muted-foreground">
										(task: {inv2.task?.id}-{inv2.task?.name})
									</span>
								</a>
							</p>
							{#if inv2.info}
								<p class="text-sm font-normal text-muted-foreground">info: {inv2.info}</p>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
</div>
