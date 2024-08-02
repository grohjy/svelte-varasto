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

	let { data } = $props();

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
</div>
