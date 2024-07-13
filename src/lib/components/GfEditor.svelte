<script lang="ts">
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
		// images_upload_handler: kk
		// content_style: `
		//     img {
		//         display:block;
		//         width:50%;
		//         height:auto;
		//         margin-left:auto;
		//         margin-right:auto;
		//     }
		//     `
	};
	// let value=$state()
	type Props = {
		value: string;
	};
	let { value = $bindable() }: Props = $props();
	// function kk(blob, progress) {
	// 	console.log('immaage upo');
	// }
</script>

<Editor scriptSrc="/tinymce/tinymce.js" {conf} licenseKey="gpl" bind:value />
