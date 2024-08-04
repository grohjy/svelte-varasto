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

	let invIndex = $state();
	let selectedTaskId = $state();
	let actionType = $state();
	let locations = data.inv.map((inv, index) => {
		const loc = `${inv.location?.rack}/${inv.location?.location}`;
		const task = `${inv.task?.id}-${inv.task?.name}`;
		const date = `${inv.createdAt.toLocaleDateString('fi')}`;
		const qty = inv.qty! - inv.inventoryRemove.reduce((sum, { qty }) => sum + qty, 0);
		let opt = { value: index, label: `${loc}: ${qty}pcs (${date}, ${task})`, qty };
		return opt;
		// console.log('inv', JSON.stringify(inv, null, 2));
	});
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
	class=" relative mx-auto grid max-w-3xl grid-cols-1 flex-col items-center justify-center *:h-[800px] lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6">
			<h1 class="text-2xl font-semibold tracking-tight">Remove items from inventory:</h1>
			<div class="flex items-center gap-2 p-2 hover:bg-slate-50">
				<Avatar.Root class="h-20 w-20  rounded-lg">
					<Avatar.Image src={data.inv[0]?.item?.thumb} alt="Thumbnail" />
					<Avatar.Fallback>{data.inv[0]?.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>

				<div class="flex flex-col space-y-2 text-center">
					{data.inv[0].itemId}-{data.inv[0].item?.name}
				</div>
			</div>
			<div class="grid gap-6">
				<form method="POST" use:enhance={handleOnSubmit} id="formjg" enctype="multipart/form-data">
					<div class="grid gap-2">
						<input type="hidden" name="inv" value={data.inv[invIndex]?.id} />
						<GfCombobox options={locations} bind:selectedId={invIndex} />
						<div class="grid gap-1 self-end">
							<Label for="info">Qty</Label>
							<Input
								id="qty"
								name="qty"
								placeholder="qty"
								type="text"
								autocapitalize="none"
								autocorrect="off"
								value={locations[invIndex]?.qty}
							/>
							<input type="hidden" name="qtyLeft" value={locations[invIndex]?.qty} />
						</div>
						<input type="hidden" name="task" value={selectedTaskId} />
						<GfCombobox options={tasks} bind:selectedId={selectedTaskId} />
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

						<div class="flex items-center justify-end gap-4">
							<Button variant="ghost" href="/inventory">Cancel</Button>

							<Button type="submit" variant="outline">Remove</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
