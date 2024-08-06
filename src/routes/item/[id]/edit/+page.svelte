<script lang="ts">
	import GfItemedittable from './../../../../lib/components/gf-itemedittable.svelte';
	import GfCombobox from './../../../../lib/components/gf-combobox.svelte';
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

	type jg = { data: PageData };
	let { data }: jg = $props();
	let open = $state(false);
	let value2 = $state('');
	let thumb = $state(data.item?.thumb);

	// let selectedType = $state();
	// let parents = ;
	// const parents = data.selectableItems.map(({ id, name, type }) => {
	// 	return {
	// 		value: id,
	// 		label: `${name} (${type})`
	// 	};
	// });
	const filteredSelChildren = data.selectableItems.filter((item) => {
		const ids = data.item?.childItems?.map((item) => item.id);
		ids?.push(data.item.id);
		return !ids.includes(item.id);
	});
	// console.log('filt', filtSelItems.length, data.selectableItems.length);
	const filteredSelParents = data.selectableItems.filter((item) => {
		const ids = data.item?.parentItems?.map((item) => item.id);
		ids?.push(data.item.id);
		return !ids.includes(item.id);
	});

	const parents = filteredSelParents.map(({ id, name, type }) => {
		return {
			value: id,
			label: `${name} (${type})`
		};
	});
	const children = filteredSelChildren.map(({ id, name, type }) => {
		return {
			value: id,
			label: `${name} (${type})`
		};
	});

	const types = data.selectableTypes.map((type) => {
		return { value: type.id, label: type.type };
	});
	// id: number;
	// itemCount: number;
	// unitsCount: number;
	// unit: string;
	// name: string;
	// type: string;

	let editor;

	async function handleOnSubmit({ formData }) {
		console.log('alll', JSON.stringify(data.item));

		// const { formData: formdataImages, html } = await handleEditorContentAndImages(value);
		const { formdataImages, html } = await editor.getContentAndImages();
		// console.log('compp2', formdataImages);

		formdataImages.forEach((value, key) => {
			formData.append(key, value);
		});

		formData.append('content', html);
		formData.append('type', data.item.typeId);

		formData.append('parents', JSON.stringify(data.item?.parentItems));
		formData.append('children', JSON.stringify(data.item?.childItems));

		return async ({ result, update }) => {
			await update();
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		};
	}
	function onUrl(url: string) {
		console.log('URL');
		thumb = url;
	}
</script>

<div
	class=" relative mx-auto grid max-w-3xl grid-cols-1 flex-col items-center justify-center lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					Edit an item {data.item?.id} - {value2}
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
								value={data.item?.name}
							/>
						</div>
						<div>
							<Label for="thumb">Thumbnail</Label>
							<DropImage onDataUrl={onUrl} src={thumb} />
							<input type="hidden" name="thumb" value={thumb} />
						</div>

						<div class="grid gap-1">
							<Label for="name">Type</Label>
							<GfCombobox options={types} bind:selectedId={data.item.typeId} />
						</div>

						<h3>Parents:</h3>
						<GfItemedittable
							bind:items={data.item.parentItems}
							allItems={data.selectableItems.filter((item) => item.id !== data.item.id)}
						/>
						<!-- value={parents.find((item) => item.value == parents.value)} -->
						<h3>Children:</h3>
						<GfItemedittable
							bind:items={data.item.childItems}
							allItems={data.selectableItems.filter((item) => item.id !== data.item.id)}
						/>

						<Label for="editor">Main content</Label>
						<GfEditor bind:this={editor} value={data.item?.content || ''} />

						<div class="flex items-center justify-between space-x-2 p-6 pt-0">
							<Button variant="ghost" href={`/item/${$page.params.id}`}>Cancel</Button>
							<Button type="submit">Save</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
