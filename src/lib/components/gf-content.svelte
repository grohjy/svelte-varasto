<script lang="ts">
	import BiggerPicture, { type BiggerPictureInstance } from 'bigger-picture';
	import 'bigger-picture/css';
	import { onMount } from 'svelte';

	type Props = { content?: string };
	let { content }: Props = $props();
	let bp: BiggerPictureInstance;
	let imageLinks: NodeList;
	onMount(() => {
		bp = BiggerPicture({
			target: document.body
			// target: document.getElementById('content')
		});
		imageLinks = document.querySelectorAll('#content  img');
		for (let link of imageLinks) {
			link.addEventListener('click', openGallery);
		}
	});
	let body;
	function openGallery(e: MouseEvent) {
		e.preventDefault();
		// console.log('ooppen', imageLinks, e.currentTarget);

		bp.open({
			items: imageLinks,
			el: e.currentTarget!,
			scale: 2
			// inline: true
		});
	}
</script>

<!-- <svelte:body bind:this={body} /> -->

<div id="content" class="content prose p-4 prose-img:max-h-40 sm:prose-img:max-h-96">
	{#if content}
		{@html content}
	{:else}
		No content{/if}
</div>
<!-- /images/20240808T185011379-1.jpg -->
