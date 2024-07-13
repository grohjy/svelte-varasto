<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import GfEditor from '$lib/components/GfEditor.svelte';
	import { handleEditorImages } from '$lib/gfhelpers';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';

	export let data: PageData;
	const customer = data.customer;
	console.log('looodata', JSON.stringify(data));
</script>

<div
	class=" relative grid grid-cols-1 flex-col items-center justify-center *:h-[800px] lg:max-w-none lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">{customer.shortname}</h1>
			</div>
			<!-- {#each data.customers as customer} -->
			<div class="flex items-center p-2 hover:bg-slate-50">
				<Avatar.Root class="h-12 w-12 rounded-lg">
					<Avatar.Image src={customer.logo} alt="Logo" />
					<Avatar.Fallback>{customer.shortname.substring(0, 3).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<div class="ml-4 space-y-1">
					<p class="text-sm font-medium leading-none">{customer.shortname}</p>
					<p class="text-sm text-muted-foreground">{customer.name ? customer.name : '-'}</p>
				</div>
				<div class="ml-auto font-medium">+$1,999.00</div>
			</div>
			<Card.Root>
				<Card.Header>
					<Card.Title>
						<img src={customer.logo} alt="logo" />
						{customer.shortname}</Card.Title
					>
					<!-- <Card.Description>Card Description</Card.Description> -->
				</Card.Header>
				<Card.Content>
					<div class="content prose">{@html customer.content}</div>
				</Card.Content>
				<!-- <Card.Footer>
				  <p>Card Footer</p>
				</Card.Footer> -->
			</Card.Root>
			<!-- {/each} -->
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
