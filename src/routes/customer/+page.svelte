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

	const { data }: { data: PageData } = $props();
	let search = $state('');
	// let customers = $state();
	let customers = $derived.by(() => {
		return data.customers.filter((c) => {
			let s = search.toLowerCase();
			return (
				c.shortname.toLowerCase().includes(s) ||
				c.name?.toLowerCase().includes(s) ||
				c.id.toString().includes(s)
			);
		});
	});
	// console.log('looodata', JSON.stringify(data));
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Customers:{search}</h1>
				<div class="flex gap-2">
					<Input type="search" placeholder="Search..." bind:value={search} />
					<Button variant="outline" href="customers/create">New</Button>
				</div>
			</div>
			<pre>{JSON.stringify(customers)}</pre>
			{#each customers as customer}
				<a href={'customer/' + customer.id}>
					<div class="flex items-center p-2 hover:bg-slate-50">
						<Avatar.Root class="h-12 w-12  rounded-lg">
							<Avatar.Image src={customer.logo} alt="Logo" />
							<Avatar.Fallback>{customer.shortname.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<div class="ml-4 space-y-1">
							<p class="text-sm font-medium leading-none">
								{customer.shortname}
								<span class="text-sm text-muted-foreground">(id:{customer.id})</span>
							</p>
							<p class="text-sm text-muted-foreground">{customer.name ? customer.name : '-'}</p>
						</div>
						<div class="ml-auto font-medium">+$1,999.00</div>
					</div>
				</a>
				<!-- <Card.Root>
					<Card.Header>
						<Card.Title>
							<img src={customer.logo} alt="logo" />
							{customer.shortname}</Card.Title
						> -->
				<!-- <Card.Description>Card Description</Card.Description> -->
				<!-- </Card.Header>
					<Card.Content> -->
				<!-- <div class="content prose">{@html customer.content}</div> -->
				<!-- </Card.Content> -->
				<!-- <Card.Footer>
				  <p>Card Footer</p>
				</Card.Footer> -->
				<!-- </Card.Root> -->
			{/each}
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
