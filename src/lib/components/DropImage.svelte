<script lang="ts">
	import { fetchAndConvertImgToBase64 } from '$lib/gfhelpers';
	type Props = { onDataUrl: (url: string) => void };
	let { onDataUrl }: Props = $props();
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
				console.log('uuu1', fileURL);
				const u = await fetchAndConvertImgToBase64(fileURL);
				// console.log('uuu');
				onDataUrl(u);

				let imgTag = `<img src="${u}" alt="">`;
				document.getElementById('logo').innerHTML = imgTag;
			};
			console.log('fiile', file);
			fileReader.readAsDataURL(file);
			// dataUrl = 'jg';
		} else {
			alert('This is not an Image File');
		}
	}
	async function selectFile() {
		const file = await promptFile('image/png, image/jpeg', false);
		// console.log('selefiil', file);
		let fileReader = new FileReader();
		fileReader.onload = async () => {
			let fileURL = fileReader.result as string;
			// console.log('uuu1', fileURL);
			const u = await fetchAndConvertImgToBase64(fileURL);
			// console.log('uuu', u);
			onDataUrl(u);
			let imgTag = `<img src="${u}" alt="">`;
			document.getElementById('logo').innerHTML = imgTag;
		};
		// console.log('fiile', file);
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
</script>

<div
	id="logo"
	class="flex h-32 w-32 items-center border-2"
	ondrop={drop}
	ondragover={allowDrop}
	onclick={selectFile}
>
	<span class=" p-2 text-center">Drop image or click to open</span>
</div>
