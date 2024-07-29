<script lang="ts">
	import { handleEditorContentAndImages } from '$lib/gfhelpers';
	import Editor from '@tinymce/tinymce-svelte';
	let conf = {
		plugins: 'lists autoresize',
		menubar: false,
		toolbar: 'h1 h2 h3 bold underline italic aligncenter bullist numlist',
		valid_elements: 'h1,h2,p,strong,i,u,li,ul,ol,img[src|title|alt]',
		min_height: 300,
		max_height: 800,
		content_css: '/src/app.css',
		body_class: 'prose   mx-2 prose-img:max-h-96	'
	};
	// let value=$state()
	type Props = {
		value: string;
		// getContentAndImages: (str: string) => string;
	};
	let { value }: Props = $props();
	// let value: string = $state('');
	export async function getContentAndImages(): Promise<{ formdataImages: FormData; html: string }> {
		const { formData, html } = await handleEditorContentAndImages(value);
		return { formdataImages: formData, html };
	}
</script>

<Editor scriptSrc="/tinymce/tinymce.js" {conf} licenseKey="gpl" bind:value />
