<script lang="ts">
	import GfEditor from '$lib/components/GfEditor.svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import DropImage from '$lib/components/DropImage.svelte';
	type jg = { data: PageData };
	let { data }: jg = $props();
	let logo = $state(data.customer?.logo);
	// let value = $state();
	let editor;
	// let editor: typeof GfEditor;

	async function handleOnSubmit({ formData }) {
		// const { formData: formdataImages, html } = await handleEditorContentAndImages(value);
		const { formdataImages, html } = await editor.getContentAndImages();
		// console.log('compp2', formdataImages);

		formdataImages.forEach((value, key) => {
			formData.append(key, value);
		});
		formData.append('content', html);
		return async ({ result, update }) => {
			await update();
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
		};
	}
	function onUrl(url: string) {
		console.log('URL');
		logo = url;
	}
</script>

<div
	class=" relative mx-auto grid max-w-3xl grid-cols-1 flex-col items-center justify-center lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Edit a customer</h1>
				<!-- <p class="text-sm text-muted-foreground">Enter your email below to create your account</p> -->
			</div>

			<div class="grid gap-6">
				<form method="POST" use:enhance={handleOnSubmit} id="formjg" enctype="multipart/form-data">
					<div class="grid gap-2">
						<div class="grid gap-1">
							<Label for="shortname">Shortname</Label>
							<Input
								id="shortname"
								name="shortname"
								placeholder="shortname"
								type="text"
								autocapitalize="none"
								autocorrect="off"
								value={data.customer?.shortname}
							/>
						</div>

						<Label for="logo">Logo</Label>
						<DropImage onDataUrl={onUrl} src={logo} />
						<input type="hidden" name="logo" value={logo} />

						<Label for="editor">Main content</Label>
						<GfEditor bind:this={editor} value={data.customer?.content} />

						<div class="flex items-center justify-between space-x-2 p-6 pt-0">
							<Button variant="ghost" href={'./'}>Cancel</Button>
							<Button type="submit">Save</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
