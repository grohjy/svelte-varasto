<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input/index';

	import type { PageData } from './$types';

	let { data } = $props();
	// let { openTasks, restTasks } = $state();
	let taskFilter = $state('');
	let allTasks = $derived(
		data.tasks.filter((t) => {
			const normalizedInput = taskFilter.toLowerCase().trim();
			const inputs = normalizedInput.split(' ');
			let found = false;

			found = inputs.every((taskFilter) => {
				return (
					t.item?.name.toLowerCase().includes(taskFilter) ||
					t.type?.type.toLowerCase().includes(taskFilter) ||
					t.type?.subtype.toLowerCase().includes(taskFilter) ||
					t.status?.status.toLowerCase().includes(taskFilter)
				);

				// label.toLowerCase().includes(input)
			});
			console.log('inpu', inputs);

			return found;
		})
	);
	// let allTasks = data.tasks;
	console.log('taassk', allTasks);

	let openTasks = $derived(allTasks.filter((t) => t.status?.status == 'open'));
	let restTasks = $derived(allTasks.filter((t) => t.status?.status != 'open'));
</script>

<div class="flex justify-between">
	<h1>Tasks:</h1>
	<Input placeholder="filter" bind:value={taskFilter} class="w-44" />
</div>

<div class="">
	<h1>Open tasks:</h1>
	{#each openTasks as task}
		<a href="task/{task.id}">
			<div class="flex items-center p-2 hover:bg-slate-50">
				<Avatar.Root class="h-20 w-20  rounded-lg">
					<Avatar.Image src={task.item?.thumb} alt="Thumbnail" />
					<Avatar.Fallback>{task.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<div class="ml-4 space-y-1">
					<p class="text-sm font-medium leading-none">
						{task.id} - {task.name} ({task.item?.id}-{task.item?.name})
					</p>
					<p class="text-sm text-muted-foreground">Status: {task.status?.status}</p>
					<p class="text-sm text-muted-foreground">
						Type: {task.type?.type}/{task.type?.subtype}
					</p>
					<p class="text-sm text-muted-foreground">
						End date: {task.endDate?.toLocaleDateString()}
					</p>
				</div>
			</div>
			<!-- <pre>{JSON.stringify(task, null, 2)}</pre> -->
		</a>
	{/each}
</div>
<div class="">
	<h1>Other tasks:</h1>
	{#each restTasks as task}
		<a href="task/{task.id}">
			<div class="flex items-center p-2 hover:bg-slate-50">
				<Avatar.Root class="h-20 w-20  rounded-lg">
					<Avatar.Image src={task.item?.thumb} alt="Thumbnail" />
					<Avatar.Fallback>{task.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<div class="ml-4 space-y-1">
					<p class="text-sm font-medium leading-none">
						{task.id} - {task.name} ({task.item?.id}-{task.item?.name})
					</p>
					<p class="text-sm text-muted-foreground">Status: {task.status?.status}</p>
					<p class="text-sm text-muted-foreground">
						Type: {task.type?.type}/{task.type?.subtype}
					</p>
					<p class="text-sm text-muted-foreground">
						End date: {task.endDate?.toLocaleDateString()}
					</p>
				</div>
			</div>
			<!-- <pre>{JSON.stringify(task, null, 2)}</pre> -->
		</a>
	{/each}
</div>
