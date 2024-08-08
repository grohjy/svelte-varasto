<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import GfCombobox from '$lib/components/gf-combobox.svelte';
	import { search } from '$lib/stores.svelte.js';
	search.active = false;
	search.value = '';
	const { data }: { data: PageData } = $props();

	let user = $state();
	let actionType = $state();
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
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					Create an action for task: <br />
					{data.task.id}-{data.task?.name} ({data.task?.type?.type}/{data.task?.type?.subtype})
				</h1>
			</div>

			<div class="grid gap-6">
				<form method="POST" use:enhance={handleOnSubmit} id="formjg" enctype="multipart/form-data">
					<div class="grid gap-2">
						<div class="grid grid-cols-3 gap-2">
							<input type="hidden" name="task" value={data.task?.id} />
							<GfCombobox
								options={data.users.map((u) => ({ value: u.id, label: u.shortname }))}
								bind:selectedId={user}
							/>
							<input type="hidden" name="user" value={user} />
							<GfCombobox
								options={data.types.map((t) => ({ value: t.id, label: `${t.type}/${t.subtype}` }))}
								bind:selectedId={actionType}
							/>
							<input type="hidden" name="type" value={actionType} />
							<div class="grid gap-1 self-end">
								<Label for="info">Qty</Label>
								<Input
									id="qty"
									name="qty"
									placeholder="qty (h or €)"
									type="text"
									autocapitalize="none"
									autocorrect="off"
									disabled={!(
										data.types.find((t) => t.id == actionType)?.type == 'purchase' ||
										data.types.find((t) => t.id == actionType)?.type == 'work'
									)}
								/>
							</div>
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

						<div class="flex items-center justify-end gap-4">
							<Button variant="ghost" href="/task/{data.task.id}">Cancel</Button>

							<Button type="submit" variant="outline" disabled={!(user && actionType)}>Save</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
