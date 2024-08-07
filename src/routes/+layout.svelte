<script lang="ts">
	import '../app.css';
	import {
		Box,
		Boxes,
		CalendarCheck2,
		ListChecks,
		CircleUser,
		Menu,
		Search,
		Users
	} from 'lucide-svelte';

	// import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	// import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import GfNav from '$lib/components/gf-nav.svelte';

	// import type { PageData } from './$types';
	// export let data: PageData;
	// import type { LayoutData } from './$types';

	let { data, children } = $props();
	import { page } from '$app/stores';
	import { search } from '$lib/stores.svelte';
	console.log('layoout');
</script>

<div class=" grid min-h-screen w-full lg:grid-cols-[220px_1fr]">
	<div class=" hidden border-r bg-muted/40 lg:block">
		<div class="flex max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<img src="/kettu.png" alt="" class="h-8 w-8 object-contain" />
					<span class="">Greenfox</span>
				</a>
			</div>
			<div class="flex-1">
				<GfNav url={$page.url.pathname} />
			</div>
		</div>
	</div>
	<div class="flex max-h-screen flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 lg:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<GfNav hamburger url={$page.url.pathname} />
				</Sheet.Content>
			</Sheet.Root>
			<div class="flex flex-grow justify-end gap-4">
				{#if search.active}
					<div class="w-40">
						<!-- <div class="w-full flex-1"> -->
						<form>
							<div class="relative">
								<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Filter..."
									class="w-full appearance-none bg-background pl-8 shadow-none "
									bind:value={search.value}
								/>
							</div>
						</form>
					</div>
				{/if}
				<!-- <DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
							<CircleUser class="h-5 w-5" />
							<span class="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Item>Support</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Logout</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root> -->
			</div>
		</header>
		<main class="flex flex-1 flex-col gap-4 overflow-auto p-4 lg:gap-6 lg:p-6">
			<!-- <slot></slot> -->
			{@render children()}
		</main>
	</div>
</div>
