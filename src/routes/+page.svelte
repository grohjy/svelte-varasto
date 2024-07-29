<script lang="ts">
	import GfCombobox from './../lib/components/gf-combobox.svelte';
	// import GfEditor from '$lib/components/GfEditor.svelte';
	// import { handleEditorImages } from '$lib/gfhelpers';
	import type { PageData } from './$types';
	import GfItemeditcombobox from '$lib/components/gf-itemeditcombobox.svelte';
	// import Editor from '@tinymce/tinymce-svelte';
	import { Button } from '$lib/components/ui/button/index';

	// export let data: PageData;
	let value = '';
	// async function handleOnSubmit(e) {
	// 	e.preventDefault();
	// 	value = await handleEditorImages(value, 50);
	// 	requestAnimationFrame(() => e.target.submit());
	// }
	let jg = 1;
	let opts = [
		{ id: 1, name: 'Latch', type: 'product/PA' },
		{ id: 2, name: 'grilamid', type: 'plastic/PA' },
		{ id: 3, name: 'makrolon', type: 'plastic/PC' },
		{ id: 4, name: 'km130', type: 'work/injection molding' },
		{ id: 5, name: 'M3-insert', type: 'purchase/component' },
		{ id: 6, name: 'ltk 38x38-34', type: 'purchase/component' },
		{ id: 7, name: 'front cover', type: '-/-' }
	];
	let opts2 = opts.map((i) => ({
		value: i.id,
		label: i.name
	}));
	function jg2() {
		jg3 = { id: 1, itemCount: 11, unitsCount: 41, unit: 'pcss1' };
	}
	let jg3 = $state();
	// let jg3 = $state({ id: 4, itemCount: 3, unitsCount: 4, unit: 'pcss' });
	function add() {
		console.log('addd', jg3);
		// jg3 = { itemCount: 99, unitsCount: 41, unit: 'pcssadd' };
		jg3 = {};
	}
</script>

<div>
	<h1>My log</h1>
	<main>
		<h1>Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
		<!-- <GfCombobox options={opts2} bind:selectedId={jg} /> -->
		<GfItemeditcombobox bind:item={jg3} options={opts2} />
		jg3:
		<pre>{JSON.stringify(jg3)}</pre>
		<pre onclick={jg2}>b:{jg}</pre>
		<Button variant="ghost" onclick={add} disabled={!jg3.id}>Add</Button>
	</main>
</div>
