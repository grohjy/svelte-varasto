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
				<Avatar.Image src={data.task.item.thumb} alt="Thumbnail" />
				<Avatar.Fallback>{data.task.item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>

			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">
					Task: {data.task.id} - {data.task.name} (<a href="/item/{data.task?.itemId}"
						>{data.task?.itemId} - {data.task?.item.name}</a
					>)
				</p>
				<p class="text-sm text-muted-foreground">Status: {data.task.status?.status}</p>
				<p class="text-sm text-muted-foreground">
					Type: {data.task.type?.type}/{data.task.type?.subtype}
				</p>
				<p class="text-sm text-muted-foreground">
					Date: {data.task?.startDate?.toLocaleDateString()} - {data.task?.endDate?.toLocaleDateString()}
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
		<Card.Content class="pt-6">
			<GfContent content={data.task.content} />
		</Card.Content>
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
		<Card.Content class="pt-6">
			{#if data.task?.actions.length == 0}
				<p>No actions</p>
			{:else}
				{#each data.task?.actions as action}
					<div class="mb-4 ml-4 space-y-1">
						<p class="text-sm font-medium leading-none">
							{action.createdAt.toLocaleDateString()}, {action.createdAt.toLocaleTimeString([], {
								timeStyle: 'short'
							})} / <a href="/user/{action.user?.id}">{action.user?.shortname}</a>:
							{#if action.type?.type == 'work'}
								{action.qty}h
							{:else if action.type?.type == 'purchase'}
								{action.qty}€
							{/if}

							{action.type?.type}/{action.type?.subtype}
						</p>
						<p class="text-sm text-muted-foreground">Info: {action.info}</p>
					</div>
				{/each}
			{/if}
		</Card.Content>
	</Card.Root>
</div>
