<script lang="ts">
	import { fetchAndConvertImgToBase64 } from '$lib/gfhelpers';
	import Button from './ui/button/button.svelte';
	type Props = { onDataUrl: (url: string) => void; src: string };
	let { onDataUrl, src }: Props = $props();
	// let dataUrl = $state();
	function allowDrop(e) {
		e.preventDefault();
		// console.log('adopped', e);
	}
	function drop(e) {
		e.preventDefault();
		// console.log('evee', e);

		if (e.dataTransfer.items) {
			[...e.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					displayFile(file);
				}
				// console.log('dopped', item);
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
				// console.log('uuu1', fileURL);
				const u = await fetchAndConvertImgToBase64(fileURL);
				// console.log('uuu');
				onDataUrl(u);

				// let imgTag = `<img src="${u}" alt="" class="max-h-full max-w-full">`;
				// document.getElementById('logo').innerHTML = imgTag;
			};
			// console.log('fiile', file);
			fileReader.readAsDataURL(file);
			// dataUrl = 'jg';
		} else {
			alert('This is not an Image File');
		}
	}
	async function pasteFile() {
		try {
			const clipboardItems = await navigator.clipboard.read();
			for (const clipboardItem of clipboardItems) {
				const imageType = clipboardItem.types.find((type) => type.startsWith('image/'));
				const blob = await clipboardItem.getType(imageType);
				displayFile(blob);
			}
		} catch (err) {
			console.error(err.name, err.message);
			alert("Couldn't paste an image");
		}
	}
	async function selectFile() {
		const file = await promptFile('image/png, image/jpeg', false);
		let fileReader = new FileReader();
		fileReader.onload = async () => {
			let fileURL = fileReader.result as string;
			const u = await fetchAndConvertImgToBase64(fileURL);
			onDataUrl(u);
			// let imgTag = `<img src="${u}" alt="" class="max-h-full max-w-full">`;
			// document.getElementById('logo').innerHTML = imgTag;
		};
		// console.log('fiile', file);
		fileReader.readAsDataURL(file);
	}
	async function promptFile(contentType, multiple) {
		var input = document.createElement('input');
		input.type = 'file';
		input.multiple = multiple;
		input.accept = contentType;
		return new Promise(function (resolve) {
			// document.activeElement.onfocus = function () {
			// 	document.activeElement.onfocus = null;
			// 	setTimeout(resolve, 500);
			// };
			input.onchange = function () {
				var files = Array.from(input.files);
				if (multiple) return resolve(files);
				resolve(files[0]);
			};

			input.click();
		});
	}
</script>

<!-- class="flex h-32 w-32 items-center justify-center rounded-md border-2" -->
<div class="flex flex-col gap-2">
	<Button
		variant="outline"
		id="logo"
		ondrop={drop}
		ondragover={allowDrop}
		onclick={pasteFile}
		class="h-32 w-32 p-0"
	>
		{#if src}
			<img {src} alt="" class="h-full w-full object-contain" />
		{:else}
			<p class="m-2 whitespace-normal text-sm text-muted-foreground">
				Drop an image or click to paste
			</p>
		{/if}
	</Button>
	<Button variant="outline" onclick={selectFile} class=" w-32">Open file</Button>
</div>
