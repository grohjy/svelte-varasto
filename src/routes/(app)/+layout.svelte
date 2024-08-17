<script lang="ts">
	// import '../../app.css';
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
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import GfNav from '$lib/components/gf-nav.svelte';
	import { gfnav } from '$lib/gfhelpers';

	let { data, children } = $props();
	import { page } from '$app/stores';
	import { search } from '$lib/stores.svelte';
	import { Overlay } from '$lib/components/ui/dialog';
	// let jg=$derived
	let menuOpen = $state(false);
	let logoutForm;
	// console.log('a', JSON.stringify($page.url.href, null, 2));
</script>

<!-- a{JSON.stringify(data, null, 2)} -->
<div class=" grid min-h-dvh w-full lg:grid-cols-[220px_1fr]">
	<div class=" hidden border-r bg-muted/40 lg:block">
		<div class="flex max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<img src="/kettu.png" alt="" class="h-8 w-8 object-contain" />
					<span class="">GF Vihko</span>
				</a>
			</div>
			<div class="flex-1">
				<GfNav url={$page.url.pathname} />
			</div>
		</div>
	</div>

	<div class=" flex max-h-dvh min-w-full flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root bind:open={menuOpen}>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 lg:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Portal>
					<Sheet.Overlay class="bg-background/50 backdrop-blur-sm" />
					<Sheet.Content side="left" class="flex flex-col">
						<GfNav hamburger url={$page.url.pathname} onclick={() => (menuOpen = false)} />
					</Sheet.Content>
				</Sheet.Portal>
			</Sheet.Root>
			<div class="flex flex-grow items-center justify-between gap-4">
				<a href={gfnav.find((nav) => $page.url.href.includes(nav.url))?.url}>
					<p class="text-lg font-medium leading-none">
						{gfnav.find((nav) => $page.url.href.includes(nav.url))?.name}
					</p>
				</a>
				<div class="flex items-center gap-4">
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
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="secondary"
								size="icon"
								class="h-12 w-12 rounded-full"
							>
								{data.user.shortname}

								<!-- <CircleUser class="h-5 w-5" /> -->
								<span class="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Label>{data.user.firstname} {data.user.lastname}</DropdownMenu.Label>
							<!-- <DropdownMenu.Separator /> -->
							<form method="POST" action="/login?/logout" bind:this={logoutForm} id="form">
								<DropdownMenu.Item onclick={() => logoutForm.submit()}>
									Logout
									<!-- <Button type="submit" variant="ghost">Logout</Button> -->
								</DropdownMenu.Item>
							</form>

							<!-- <DropdownMenu.Item>Support</DropdownMenu.Item> -->
							<!-- <DropdownMenu.Separator /> -->
							<!-- <DropdownMenu.Item>						</DropdownMenu.Item> -->
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</header>
		<main class="flex flex-1 flex-col gap-4 overflow-auto">
			<!-- <slot></slot> -->
			<div class="p-2">
				{@render children()}
			</div>
		</main>
	</div>
</div>
