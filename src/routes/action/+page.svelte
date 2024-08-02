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
	let actions = $derived.by(() => {
		return data.actions.filter((c) => {
			let s = search.toLowerCase();
			return (
				c.type?.type.toLowerCase().includes(s) ||
				c.type?.subtype?.toLowerCase().includes(s) ||
				c.task?.type?.type.toLowerCase().includes(s) ||
				c.task?.type?.subtype.toLowerCase().includes(s)
			);
		});
	});
	// console.log('looodata', JSON.stringify(data));
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center *:h-[800px] lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Actions:</h1>
				<div class="flex gap-2">
					<Input type="search" placeholder="Filter..." bind:value={search} />
					<!-- <Button variant="outline" href="customers/create">New</Button> -->
				</div>
			</div>
			<!-- <pre>{JSON.stringify(actions)}</pre> -->
			{#each actions as action}
				<div class="flex items-center p-2 hover:bg-slate-50">
					<div class="ml-4 space-y-1">
						<p class="text-sm font-medium leading-none">
							{action.createdAt.toLocaleDateString()}, {action.createdAt.toLocaleTimeString([], {
								timeStyle: 'short'
							})} / <a href="/user/{action.user?.id}">{action.user?.shortname}</a>:
							{#if action.type?.type == 'work'}
								{action.qty}h
							{:else if action.type?.type == 'purchase'}
								{action.qty}€
							{/if}

							{action.type?.type}/{action.type?.subtype}
							<a href="/task/{action.task?.id}">
								<span class="text-sm text-muted-foreground"
									>(task:{action.task?.id}-{action.task?.name})</span
								>
							</a>
						</p>
						<p class="text-sm text-muted-foreground">Info: {action.info}</p>
					</div>
					<!-- <div class="ml-auto font-medium">+$1,999.00</div> -->
				</div>
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
