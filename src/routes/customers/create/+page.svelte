<script lang="ts">
	import GfEditor from '$lib/components/GfEditor.svelte';
	import {
		handleEditorImages,
		handleEditorContentAndImages,
		fetchAndConvertImgToBase64
	} from '$lib/gfhelpers';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import DropImage from '$lib/components/DropImage.svelte';
	let logo = $state();
	// export let data: PageData;
	let value = $state();

	function allowDrop(e) {
		e.preventDefault();
		console.log('adopped', e);
	}
	function drop(e) {
		e.preventDefault();
		console.log('evee', e);

		if (e.dataTransfer.items) {
			[...e.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					displayFile(file);
					// document.getElementById('logo');
					// const img = document.createElement('img');
					// img.src = fetchAndConvertImgToBase64();
					// console.log(`… file[${i}].name = ${file.name}`);
				}
				console.log('dopped', item);
			});
		}
	}
	function displayFile(file) {
		let fileType = file.type;
		let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
		if (validExtensions.includes(fileType)) {
			let fileReader = new FileReader();
			fileReader.onload = async () => {
				let fileURL = fileReader.result as string;
				console.log('uuu1', fileURL);
				const u = await fetchAndConvertImgToBase64(fileURL);
				console.log('uuu', u);

				let imgTag = `<img src="${u}" alt="">`;
				document.getElementById('logo').innerHTML = imgTag;

				// dropArea.innerHTML = imgTag;
			};
			console.log('fiile', file);

			fileReader.readAsDataURL(file);
		} else {
			alert('This is not an Image File');
			// dropArea.classList.remove('active');
		}
	}
	async function selectFile() {
		const file = await promptFile('image/png, image/jpeg', false);
		console.log('selefiil', file);
		let fileReader = new FileReader();
		fileReader.onload = async () => {
			let fileURL = fileReader.result as string;
			console.log('uuu1', fileURL);
			const u = await fetchAndConvertImgToBase64(fileURL);
			console.log('uuu', u);

			let imgTag = `<img src="${u}" alt="">`;
			document.getElementById('logo').innerHTML = imgTag;

			// dropArea.innerHTML = imgTag;
		};
		console.log('fiile', file);

		fileReader.readAsDataURL(file);
	}
	function promptFile(contentType, multiple) {
		var input = document.createElement('input');
		input.type = 'file';
		input.multiple = multiple;
		input.accept = contentType;
		return new Promise(function (resolve) {
			document.activeElement.onfocus = function () {
				document.activeElement.onfocus = null;
				setTimeout(resolve, 500);
			};
			input.onchange = function () {
				var files = Array.from(input.files);
				if (multiple) return resolve(files);
				resolve(files[0]);
			};
			input.click();
		});
	}
	async function handleOnSubmit({ formData }) {
		const { formData: formdataImages, html } = await handleEditorContentAndImages(value);
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
	class=" relative mx-auto grid max-w-3xl grid-cols-1 flex-col items-center justify-center *:h-[800px] lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create a new customer</h1>
				<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
			</div>

			<div class="grid gap-6">
				<form method="POST" use:enhance={handleOnSubmit} id="formjg" enctype="multipart/form-data">
					<div class="grid gap-2">
						<div class="grid gap-1">
							<Label for="shortname">Customer shortname</Label>
							<Input
								id="shortname"
								name="shortname"
								placeholder="shortname"
								type="text"
								autocapitalize="none"
								autocorrect="off"
							/>
						</div>

						<Label for="logo">Logo</Label>
						<DropImage onDataUrl={onUrl} />
						<input type="hidden" name="logo" value={logo} />
						<Label for="editor">Main content</Label>
						<GfEditor bind:value />
						<!-- <input name="content" type="hidden" bind:value /> -->
						<div class="flex items-center justify-between space-x-2 p-6 pt-0">
							<!-- <Button variant="outline" type="button">Cancel</Button> -->
							<Button variant="ghost">Cancel</Button>
							<Button type="submit">Create</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
