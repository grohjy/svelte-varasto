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
	const { data }: { data: PageData } = $props();

	let selectedItemId = $state(data.itemId);
	let selectedInvId = $state();
	let selectedTaskId = $state(data.taskId);
	let qtyInput = $state();
	let qtyState = $state();
	let actionType = $state();
	let qty = $derived.by(() => {
		let i = data.inv.find((inv) => inv.id == selectedInvId);
		return i?.inventoryRemove.reduce((sum, { qty }) => sum - qty, i.qty);
	});
	let button = $derived.by(() => {
		let ok = !selectedItemId || !selectedInvId || !selectedTaskId || !qtyState;

		// console.log('ww');

		return ok;
	});
	$effect(() => {
		selectedItemId;
		selectedInvId = undefined;
		console.log('qq');
	});
	$effect(() => {
		selectedInvId;
		qtyState = qty;
		console.log('qq2');
	});
	let items = data.inv.map((inv) => {
		let opt = [inv.itemId, { value: inv.itemId, label: `${inv.itemId}-${inv.item.name}` }];
		return opt;
	});
	items = [...new Map(items).values()];
	// console.log('set ite', [...new Map(items).values()]);

	let locations = $derived.by(() => {
		// selectedInvId = undefined;
		let i = data.inv
			.filter((inv) => inv.itemId == selectedItemId)
			.map((inv, index) => {
				const loc = `${inv.location?.rack}/${inv.location?.location}`;
				const task = `${inv.task?.id}-${inv.task?.name}`;
				const date = `${inv.createdAt.toLocaleDateString('fi')}`;
				const qty = inv.qty! - inv.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0);
				let opt = { value: inv.id, label: `${loc}: ${qty}pcs (${date}, ${task})`, qty };
				return opt;
			});

		return i;
	});
	// console.log('inv', JSON.stringify(data.inv, null, 2));
	let tasks = data.tasks.map((task, index) => {
		const taskStr = `${task.id}-${task.name}`;
		const item = `${task.item?.id}-${task.item?.name}`;
		// const date = `${task.createdAt.toLocaleDateString('fi')}`;
		// const qty = task.qty! - task.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0);
		let opt = { value: task.id, label: `${taskStr} (item: ${item})` };
		return opt;
		// console.log('inv', JSON.stringify(inv, null, 2));
	});
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
			<h1 class="text-2xl font-semibold tracking-tight">Remove items from inventory:</h1>
			<div class="grid gap-6">
				<form method="POST" use:enhance={handleOnSubmit} id="formjg" enctype="multipart/form-data">
					<div class="grid gap-2">
						<div class="grid gap-1 self-end">
							<Label for="info">Item</Label>
							{#if !data.itemId}
								<input type="hidden" name="item" value={selectedItemId} />
								<GfCombobox options={items} bind:selectedId={selectedItemId} />
							{:else}
								<p>{data.inv[0].itemId}-{data.inv[0].item?.name}</p>
							{/if}
						</div>
						<div class="grid gap-1 self-end">
							<Label for="info">Location</Label>
							<input type="hidden" name="location" value={selectedInvId} />
							<GfCombobox options={locations} bind:selectedId={selectedInvId} />
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
								bind:this={qtyInput}
								onchange={(e) => (qtyState = e.target.value)}
								bind:value={qtyState}
							/>
							<!-- <input type="hidden" name="qtyLeft" value={locations[selectedLocation]?.qty} /> -->
						</div>
						<div class="grid gap-1">
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
						<div class="grid gap-1 self-end">
							<Label for="info">Task (that removes items from inventory)</Label>
							<input type="hidden" name="task" value={selectedTaskId} />
							{#if !data.taskId}
								<GfCombobox options={tasks} bind:selectedId={selectedTaskId} />
							{:else}
								<p>
									{data.tasks[0].id}-{data.tasks[0].name} ({data.tasks[0].item.id}-{data.tasks[0]
										.item?.name})
								</p>
							{/if}
						</div>

						<div class="flex items-center justify-end gap-4">
							<Button variant="ghost" href={data.itemId ? '/inventory' : `/task/${data.taskId}`}
								>Cancel</Button
							>

							<Button type="submit" variant="outline" disabled={button}>Remove</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
