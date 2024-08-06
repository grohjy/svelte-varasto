<script lang="ts">
	import { gfnav } from '$lib/gfhelpers';
	import {
		Box,
		Boxes,
		CalendarCheck2,
		Check,
		ChevronDown,
		ChevronUp,
		ListChecks,
		Users
	} from 'lucide-svelte';
	let { url } = $props();
</script>

{#snippet navItem({ name, url, icon, selected })}
	<a
		href={url}
		class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary {selected
			? 'bg-muted text-primary'
			: ' text-muted-foreground'}"
	>
		<!-- class:clNotSelected={!selected} -->
		<!-- class:clSelected={selected} -->
		<svelte:component this={icon} />
		<!-- <Box class="h-4 w-4" /> -->
		{name}
	</a>
{/snippet}

<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
	{#each gfnav as n}
		{@render navItem({ url: n.url, name: n.name, icon: n.icon, selected: url.includes(n.url) })}
	{/each}
	<a
		href="##"
		class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
	>
		<CalendarCheck2 class="h-4 w-4" />
		Tasks
	</a>
	<a
		href="##"
		class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
	>
		<ListChecks class="h-4 w-4" />
		Actions
	</a>
	<a
		href="##"
		class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
	>
		<Users class="h-4 w-4" />
		Users
	</a>
	<a
		href="##"
		class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
	>
		<Boxes class="h-4 w-4" />
		Inventory
	</a>
</nav>
