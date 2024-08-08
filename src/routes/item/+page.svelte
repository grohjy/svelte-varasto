<script lang="ts">
	// import GfCombobox from './../../../lib/components/gf-combobox.svelte';
	import { page } from '$app/stores';
	import GfContent from '$lib/components/gf-content.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { search } from '$lib/stores.svelte.js';
	search.active = true;
	search.value = '';
	let { data } = $props();
	// let gfsearch = $derived($page.data.search);

	let items = $derived.by(() => {
		return data.items.filter((c) => {
			const found = search.cleanedValues.every((value) => {
				return (
					c.name.toLowerCase().includes(value) ||
					c.type?.type?.toLowerCase().includes(value) ||
					c.type?.subtype?.toLowerCase().includes(value)
				);
			});
			return found;
		});
	});
</script>

<form method="post" action={`${$page.url}/create`}>
	<div class="flex justify-between">
		<p class="text-lg font-medium leading-none">Items:</p>
		<Button type="submit" variant="outline">Create</Button>
	</div>
</form>

<div class="flex flex-col gap-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Customers:</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			{#each items.filter((item) => item.type?.subtype == 'customer') as item}
				<div class="flex items-center p-2 hover:bg-slate-50">
					<a href="/item/{item.id}">
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={item.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</a>
					<div class="ml-4 space-y-1">
						<!-- <p class="text-sm font-medium leading-none">
							{item.updatedAt.toLocaleDateString('fi')},
							{item.updatedAt.toLocaleTimeString('fi', {
								timeStyle: 'short'
							})}:
						</p> -->
						<a href="/item/{item.id}">
							<p class="text-sm font-medium leading-none">
								{item.id}-{item.name}

								<span class="text-sm text-muted-foreground"
									>({item.type?.type}/{item.type?.subtype})</span
								>
							</p>
						</a>
						<a href="/item/{item.parentItems[0]?.parent?.id}">
							<p class="text-sm text-muted-foreground">
								Parent: {item.parentItems[0]?.parent?.id}-{item.parentItems[0]?.parent?.name}
								({item.parentItems[0]?.parent?.type?.type}/{item.parentItems[0]?.parent?.type
									?.subtype})
							</p>
						</a>
					</div>
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">No items</p>
			{/each}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Products:</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			{#each items.filter((item) => item.type?.type == 'product') as item}
				<div class="flex items-center p-2 hover:bg-slate-50">
					<a href="/item/{item.id}">
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={item.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</a>
					<div class="ml-4 space-y-1">
						<a href="/item/{item.id}">
							<p class="text-sm font-medium leading-none">
								{item.id}-{item.name}

								<span class="text-sm text-muted-foreground"
									>({item.type?.type}/{item.type?.subtype})</span
								>
							</p>
						</a>
						<a href="/item/{item.parentItems[0]?.parent?.id}">
							<p class="text-sm text-muted-foreground">
								Parent: {item.parentItems[0]?.parent?.id}-{item.parentItems[0]?.parent?.name}
								({item.parentItems[0]?.parent?.type?.type}/{item.parentItems[0]?.parent?.type
									?.subtype})
							</p>
						</a>
					</div>
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">No items</p>
			{/each}
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Other:</Card.Title>
		</Card.Header>
		<Card.Content class="pt-6">
			{#each items.filter((item) => !(item.type?.type == 'product' || item.type?.subtype == 'customer')) as item}
				<div class="flex items-center p-2 hover:bg-slate-50">
					<a href="/item/{item.id}">
						<Avatar.Root class="h-20 w-20  rounded-lg">
							<Avatar.Image src={item.thumb} alt="Thumbnail" />
							<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</a>
					<div class="ml-4 space-y-1">
						<a href="/item/{item.id}">
							<p class="text-sm font-medium leading-none">
								{item.id}-{item.name}

								<span class="text-sm text-muted-foreground"
									>({item.type?.type}/{item.type?.subtype})</span
								>
							</p>
						</a>
						<a href="/item/{item.parentItems[0]?.parent?.id}">
							<p class="text-sm text-muted-foreground">
								Parent: {item.parentItems[0]?.parent?.id}-{item.parentItems[0]?.parent?.name}
								({item.parentItems[0]?.parent?.type?.type}/{item.parentItems[0]?.parent?.type
									?.subtype})
							</p>
						</a>
					</div>
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">No items</p>
			{/each}
		</Card.Content>
	</Card.Root>
</div>
