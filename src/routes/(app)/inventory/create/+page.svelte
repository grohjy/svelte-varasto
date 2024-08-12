<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Avatar from '$lib/components/ui/avatar';

	import { cn } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import GfCombobox from '$lib/components/gf-combobox.svelte';
	import { search } from '$lib/stores.svelte.js';
	search.active = false;
	search.value = '';

	const { data }: { data: PageData } = $props();

	let locId = $state();
	let qty = $state();
	let taskId = $state(data.tasks.length == 1 ? data.tasks[0].id : null);
	let actionType = $state();
	let locations = data.storages.map((s, index) => {
		const loc = `${s.rack}/${s.location}`;
		// const task = `${inv.task?.id}-${inv.task?.name}`;
		// const date = `${inv.createdAt.toLocaleDateString('fi')}`;
		// const qty = inv.qty! - inv.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0);
		let opt = { value: s.id, label: `${loc}` };
		return opt;
		// console.log('inv', JSON.stringify(inv, null, 2));
	});
	let tasks = data.tasks.map((task, index) => {
		const taskStr = `${task.id}-${task.name}`;
		const item = `${task.itemId}-${task.item?.name}`;
		// const date = `${task.createdAt.toLocaleDateString('fi')}`;
		// const qty = task.qty! - task.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0);
		let opt = { value: task.id, label: `${taskStr} (item: ${item})` };
		return opt;
		// console.log('inv', JSON.stringify(inv, null, 2));
	});
	let cancelHref = tasks.length > 1 ? '/inventory' : `/task/${taskId}`;

	async function handleOnSubmit({ formData }) {
		// formData.append('content', html);
		return async ({ result, update }) => {
			await update();
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		};
	}
</script>

<div
	class=" relative mx-auto grid max-w-3xl grid-cols-1 flex-col items-center justify-center lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6">
			<h1 class="text-2xl font-semibold tracking-tight">Add items to inventory:</h1>
			<!-- <div class="flex items-center gap-2 p-2">
				<Avatar.Root class="h-20 w-20  rounded-lg">
					<Avatar.Image src={data.task?.item?.thumb} alt="Thumbnail" />
					<Avatar.Fallback>{data.task?.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>

				<div class="flex flex-col space-y-2">
					{data.task?.itemId}-{data.task?.item?.name}
				</div>
			</div>
			<div class="flex flex-col space-y-2">
				Task: {data.task?.id}-{data.task?.name}
			</div> -->
			<div class="grid gap-6">
				<form method="POST" use:enhance={handleOnSubmit} id="formjg">
					<div class="grid gap-2">
						<div class="grid gap-1 self-end">
							<Label for="location">Task(item)</Label>
							<input type="hidden" name="task" value={taskId} />
							{#if tasks.length > 1}
								<GfCombobox options={tasks} bind:selectedId={taskId} />
							{:else}
								<p>{tasks[0].label}</p>
							{/if}
						</div>
						<div class="grid gap-1 self-end">
							<Label for="location">Location</Label>
							<input type="hidden" name="location" value={locId} />
							<GfCombobox options={locations} bind:selectedId={locId} />
						</div>
						<div class="grid gap-1 self-end">
							<Label for="info">Qty</Label>
							<Input
								id="qty"
								name="qty"
								placeholder="qty"
								type="text"
								autocapitalize="none"
								autocorrect="off"
								bind:value={qty}
							/>
						</div>
						<div class="grid gap-1 self-end">
							<Label for="info">Info</Label>
							<Input
								id="info"
								name="info"
								placeholder="info"
								type="text"
								autocapitalize="none"
								autocorrect="off"
							/>
						</div>
						<div class="flex items-center justify-end gap-4">
							<Button variant="ghost" href={cancelHref}>Cancel</Button>

							<Button type="submit" variant="outline" disabled={!locId || !qty || !taskId}
								>Add</Button
							>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
