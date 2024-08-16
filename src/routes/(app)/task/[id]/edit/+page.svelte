<script lang="ts">
	import GfItemedittable from '$lib/components/gf-itemedittable.svelte';
	import GfCombobox from '$lib/components/gf-combobox.svelte';
	import GfEditor from '$lib/components/GfEditor.svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import DropImage from '$lib/components/DropImage.svelte';
	import { page } from '$app/stores';

	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Command as Cmd } from 'cmdk-sv';
	import GfSelect from '$lib/components/gf-select.svelte';
	import GfItemeditrow from '$lib/components/gf-itemeditrow.svelte';
	import GfDaterange from '$lib/components/gf-daterange.svelte';
	import { search } from '$lib/stores.svelte.js';
	search.active = false;
	search.value = '';

	type jg = { data: PageData };
	let { data }: jg = $props();
	// let dates = $state({ start: '2024-07-09T00:00:00.000Z', end: '2024-07-12' });
	// let dates = $state({ start: '2024-07-01', end: '2024-07-12' });
	let dates = $state({ start: data.task?.startDate, end: data.task?.endDate });
	let typeId = data.task?.typeId;
	let statusId = data.task?.statusId;

	const types = data.selectableTypes.map((type) => {
		return { value: type.id, label: type.type };
	});
	const status = data.selectableStatus.map((status) => {
		return { value: status.id, label: status.status };
	});

	let editor;

	async function handleOnSubmit({ formData }) {
		// console.log('alll', JSON.stringify(data.item));

		const { formdataImages, html } = await editor.getContentAndImages();

		formdataImages.forEach((value, key) => {
			formData.append(key, value);
		});

		formData.append('content', html);
		formData.append('type', typeId);
		formData.append('status', statusId);
		formData.append('startDate', dates.start);
		formData.append('endDate', dates.end);

		// formData.append('parents', JSON.stringify(data.item?.parentItems));
		// formData.append('children', JSON.stringify(data.item?.childItems));

		return async ({ result, update }) => {
			await update();
		};
	}
	// function onUrl(url: string) {
	// 	console.log('URL');
	// 	thumb = url;
	// }
</script>

<div class=" relative grid max-w-5xl grid-cols-1 flex-col items-center justify-center lg:px-0">
	<!-- <div class="lg:p-1"> -->
	<div class="mx-auto flex w-full flex-col justify-center space-y-6">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">
				Edit task {data.task?.id}-{data.task?.name}
			</h1>
			<!-- <p class="text-sm text-muted-foreground">Enter your email below to create your account</p> -->
		</div>

		<div class="grid gap-6">
			<form method="POST" use:enhance={handleOnSubmit} id="formjg" enctype="multipart/form-data">
				<div class="grid gap-2">
					<div class="grid gap-1">
						<Label for="name">Name</Label>
						<Input
							id="name"
							name="name"
							placeholder="name"
							type="text"
							autocapitalize="none"
							autocorrect="off"
							value={data.task?.name}
						/>
					</div>

					<div class="grid gap-1">
						<Label for="name">Type</Label>
						<GfCombobox options={types} bind:selectedId={typeId} />
					</div>
					<div class="grid gap-1">
						<Label for="name">Status</Label>
						<GfCombobox options={status} bind:selectedId={statusId} />
					</div>
					<Label for="">Dates</Label>
					<GfDaterange bind:value={dates} />
					<div class="grid gap-1">
						<Label for="name">Qty</Label>
						<Input
							id="qty"
							name="qty"
							placeholder="qty (pcs or h)"
							type="number"
							value={data.task?.qty}
						/>
					</div>

					<!-- <p>{JSON.stringify(dates)}</p> -->
					<Label for="editor">Main content</Label>
					<GfEditor bind:this={editor} value={data.task?.content || ''} />

					<div class="flex items-center justify-end space-x-2 p-6 pt-0">
						<Button variant="ghost" href={`/task/${$page.params.id}`}>Cancel</Button>
						<Button type="submit" variant="outline" disabled={!dates || !dates.start}>Save</Button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- </div> -->
</div>
