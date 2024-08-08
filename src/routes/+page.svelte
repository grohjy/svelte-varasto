<script lang="ts">
	// import GfCombobox from './../../../lib/components/gf-combobox.svelte';
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
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between">
		<p class="text-sm font-medium leading-none">Recent events:</p>
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Items</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			{#each data.items as item}
				<div class="flex items-center p-2 hover:bg-slate-50">
					<a href="/item/{item.id}">
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={item.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</a>
					<div class="ml-4 space-y-1">
						<p class="text-sm font-medium leading-none">
							{item.updatedAt.toLocaleDateString('fi')},
							{item.updatedAt.toLocaleTimeString('fi', {
								timeStyle: 'short'
							})}:
						</p>
						<a href="/item/{item.id}">
							<p class="text-sm font-medium leading-none">
								{item.id}-{item.name}

								<span class="text-sm text-muted-foreground"
									>({item.type?.type}/{item.type?.subtype})</span
								>
							</p>
						</a>
						<a href="/item/{item.parentItems[0]?.parent?.id}">
							<p class="text-sm text-muted-foreground">
								Parent: {item.parentItems[0]?.parent?.id}-{item.parentItems[0]?.parent?.name}
								({item.parentItems[0]?.parent?.type?.type}/{item.parentItems[0]?.parent?.type
									?.subtype})
							</p>
						</a>
					</div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Tasks</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			{#each data.tasks as task}
				<div class="flex items-center p-2 hover:bg-slate-50">
					<a href="/item/{task.item?.id}">
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={task.item?.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{task.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</a>
					<div class="ml-4 space-y-1">
						<p class="text-sm font-medium leading-none">
							{task.updatedAt.toLocaleDateString('fi')},
							{task.updatedAt.toLocaleTimeString('fi', {
								timeStyle: 'short'
							})}:
						</p>

						<a href="/task/{task.id}">
							<p class="text-sm font-medium leading-none">
								{task.id}-{task.name}

								<span class="text-sm text-muted-foreground"
									>({task.type?.type}/{task.type?.subtype}),
									{task.status?.status}</span
								>
							</p>
						</a>
						<a href="/item/{task.item?.id}">
							<p class="text-sm text-muted-foreground">
								Item: {task.item?.id}-{task.item?.name}
								({task.item?.type?.type}/{task.item?.type?.subtype})
							</p>
						</a>
					</div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Actions</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			{#each data.actions as action}
				<div class="flex items-center p-2 hover:bg-slate-50">
					<a href="/item/{action.task?.item?.id}">
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={action.task?.item?.thumb} alt="Thumbnail" />
							<Avatar.Fallback
								>{action.task?.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback
							>
						</Avatar.Root>
					</a>
					<div class="ml-4 space-y-1">
						<p class="text-sm font-medium leading-none">
							{action.createdAt.toLocaleDateString('fi')}, {action.createdAt.toLocaleTimeString(
								'fi',
								{
									timeStyle: 'short'
								}
							)} / <a href="/user/{action.user?.id}">{action.user?.shortname}</a>:
							{#if action.type?.type == 'work'}
								{action.qty}h
							{:else if action.type?.type == 'purchase'}
								{action.qty}€
							{/if}

							{action.type?.type}/{action.type?.subtype}
						</p>
						<p class="text-sm text-muted-foreground">
							<a href="/task/{action.task?.id}">
								task: {action.task?.id}-{action.task?.name} ({action.task?.type?.type}/{action.task
									?.type?.subtype}),
							</a>
							<a href="/item/{action.task?.item?.id}">
								item:{action.task?.item?.id}-{action.task?.item?.name}
							</a>
						</p>
						<p class="text-sm text-muted-foreground">Info: {action.info}</p>
					</div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
</div>
