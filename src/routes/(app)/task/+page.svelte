<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input/index';

	import type { PageData } from './$types';
	import { search } from '$lib/stores.svelte';

	let { data } = $props();
	search.active = true;
	search.value = '';

	let allTasks = $derived(
		data.tasks.filter((t) => {
			let found = false;
			found = search.cleanedValues.every((value) => {
				return (
					t.name.toLowerCase().includes(value) ||
					t.item?.name.toLowerCase().includes(value) ||
					t.type?.type?.toLowerCase().includes(value) ||
					t.type?.subtype?.toLowerCase().includes(value) ||
					t.status?.status?.toLowerCase().includes(value)
				);
			});
			return found;
		})
	);

	let openTasks = $derived(allTasks.filter((t) => t.status?.status == 'open'));
	let restTasks = $derived(allTasks.filter((t) => t.status?.status != 'open'));
</script>

<div class="flex justify-between">
	<h1>Tasks:</h1>
</div>

<div class="">
	<h1>Open tasks:</h1>
	{#each openTasks as task}
		<div class="flex items-center p-2 hover:bg-slate-50">
			<a href="/task/{task.id}">
				<Avatar.Root class="h-20 w-20  rounded-sm">
					<Avatar.Image src={task.item?.thumb} alt="Thumbnail" />
					<Avatar.Fallback>{task.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</a>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">
					<a href="/task/{task.id}" class="hover:underline">
						{task.id}-{task.name}
					</a>
					<a href="/item/{task.item?.id}" class="hover:underline">
						({task.item?.id}-{task.item?.name})
					</a>
				</p>
				<p class="text-sm text-muted-foreground">Status: {task.status?.status}</p>
				<p class="text-sm text-muted-foreground">
					Type: {task.type?.type}/{task.type?.subtype}
				</p>
				<p class="text-sm text-muted-foreground">
					End date: {task.endDate?.toLocaleDateString('fi')}
				</p>
			</div>
		</div>
	{:else}
		<p class="text-sm text-muted-foreground">no tasks</p>
	{/each}
</div>
<div class="">
	<h1>Other tasks:</h1>
	{#each restTasks as task}
		<div class="flex items-center p-2 hover:bg-slate-50">
			<a href="/task/{task.id}">
				<Avatar.Root class="h-20 w-20  rounded-sm">
					<Avatar.Image src={task.item?.thumb} alt="Thumbnail" />
					<Avatar.Fallback>{task.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</a>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">
					<a href="/task/{task.id}" class="hover:underline">
						{task.id}-{task.name}
					</a>
					<a href="/item/{task.item?.id}" class="hover:underline">
						({task.item?.id}-{task.item?.name})
					</a>
				</p>
				<p class="text-sm text-muted-foreground">Status: {task.status?.status}</p>
				<p class="text-sm text-muted-foreground">
					Type: {task.type?.type}/{task.type?.subtype}
				</p>
				<p class="text-sm text-muted-foreground">
					End date: {task.endDate?.toLocaleDateString('fi')}
				</p>
			</div>
		</div>
	{:else}
		<p class="text-sm text-muted-foreground">no tasks</p>
	{/each}
</div>
