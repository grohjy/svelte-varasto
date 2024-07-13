<script lang="ts">
	import GfEditor from '$lib/components/GfEditor.svelte';
	import { handleEditorImages } from '$lib/gfhelpers';
	import type { PageData } from './$types';
	import Editor from '@tinymce/tinymce-svelte';

	export let data: PageData;
	let value = '';
	async function handleOnSubmit(e) {
		e.preventDefault();
		value = await handleEditorImages(value, 50);
		requestAnimationFrame(() => e.target.submit());
	}
</script>

<div>
	<h1>My log</h1>
	<main>
		<GfEditor bind:value />
		<form id="f" method="POST" action="?/image" onsubmit={handleOnSubmit}>
			<!-- <Editor scriptSrc="tinymce/tinymce.js" {conf} licenseKey="gpl" bind:value /> -->
			<label>
				Name
				<input name="name" type="text" />
			</label>
			<input name="image" type="hidden" bind:value />
			<button>send</button>
		</form>
		<div>
			HTML output:
			<pre id="html-output" style="white-space:pre-wrap;">{value}</pre>
		</div>
		<canvas id="aa"></canvas>
		<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
		{#each data.data as part}
			<div>
				<p>Tässä:</p>
				<pre>{JSON.stringify(part, null, 2)}</pre>
			</div>
		{/each}
	</main>
</div>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
