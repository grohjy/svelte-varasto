<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	// import BiggerPicture, { type BiggerPictureInstance } from 'bigger-picture';
	// import 'bigger-picture/css';
	// import { onMount } from 'svelte';
	import GfContent from '$lib/components/gf-content.svelte';
	export let data: PageData;
	const customer = data.customer;
</script>

<div
	class=" relative grid grid-cols-1 flex-col items-center justify-center *:h-[800px] lg:max-w-none lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Customer: {data.customer?.shortname}</h1>
				<div class="flex gap-2">
					<Button variant="outline" href={`${data.customer?.id}/edit`}>Edit</Button>
				</div>
			</div>
			<div class="flex items-center p-2 hover:bg-slate-50">
				<Avatar.Root class="h-20 w-20  rounded-lg">
					<Avatar.Image src={customer?.logo} alt="Logo" />
					<Avatar.Fallback>{customer?.shortname.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<div class="ml-4 space-y-1">
					<p class="text-sm font-medium leading-none">{customer?.shortname}</p>
					<p class="text-sm text-muted-foreground">{customer?.name ? customer.name : '-'}</p>
				</div>
			</div>

			<Card.Root>
				<!-- <Card.Header> -->
				<!-- <Card.Title>Info</Card.Title>
					<Card.Description>Card Description</Card.Description> -->
				<!-- </Card.Header> -->
				<Card.Content class="pt-6">
					<GfContent content={customer?.content} />
					<!-- <div id="content" class="content prose">{@html customer?.content}</div> -->
				</Card.Content>
				<!-- <Card.Footer>
				  <p>Card Footer</p>
				</Card.Footer> -->
			</Card.Root>
		</div>
	</div>
</div>

<style>
	/* div.content :global(img) {
		display: block;
		width: 50%;
		height: auto;
		margin-left: auto;
		margin-right: auto;
	} */
</style>
