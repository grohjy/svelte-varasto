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
	const user = data.user;
</script>

<div
	class=" relative grid grid-cols-1 flex-col items-center justify-center *:h-[800px] lg:max-w-none lg:px-0"
>
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">User: {user?.shortname}</h1>
			</div>

			<Card.Root>
				<Card.Header>
					<Card.Title>Actions (last 20)</Card.Title>
					<!-- <Card.Description>Card Description</Card.Description> -->
				</Card.Header>
				<Card.Content class="pt-6">
					{#if user?.actions.length == 0}
						<p>No actions</p>
					{:else}
						{#each user?.actions as action}
							<div class="grid grid-cols-2 p-2 hover:bg-slate-50">
								<div class=" space-y-1">
									<p class="text-sm font-medium leading-none">
										{action.createdAt.toLocaleDateString('fi')}, {action.createdAt.toLocaleTimeString(
											'fi',
											{
												timeStyle: 'short'
											}
										)}:
										{#if action.type?.type == 'work'}
											{action.qty}h
										{:else if action.type?.type == 'purchase'}
											{action.qty}€
										{/if}

										{action.type?.type}/{action.type?.subtype}
									</p>
									<p class="text-sm text-muted-foreground">Info: {action.info}</p>
								</div>
								<div class="flex gap-2">
									<Avatar.Root class="h-20 w-20  rounded-lg ">
										<Avatar.Image src={action.task.item.thumb} alt="Thumbnail" />
										<Avatar.Fallback
											>{action.task.item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback
										>
									</Avatar.Root>
									<div class=" space-y-1 pt-2">
										<p class="text-sm font-medium leading-none">
											<a href="/task/{action.task.id}" class="hover:underline"
												>Task: {action.task.id} - {action.task.name}</a
											>
											<a href="/item/{action.task?.itemId}" class="hover:underline"
												>({action.task?.itemId} - {action.task?.item.name})</a
											>
										</p>
										<p class="text-sm text-muted-foreground">
											Type: {action.task.type?.type}/{action.task.type?.subtype}
										</p>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</Card.Content>
				<!-- <Card.Footer>
				  <p>Card Footer</p>
				</Card.Footer> -->
			</Card.Root>
		</div>
	</div>
</div>
