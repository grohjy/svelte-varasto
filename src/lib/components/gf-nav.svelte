<script lang="ts">
	import { gfnav } from '$lib/gfhelpers';
	let { url, hamburger = false, onclick } = $props();
</script>

{#snippet navItem({ name, url, icon, selected })}
	<a
		href={url}
		class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary {selected
			? 'bg-muted text-primary'
			: ' text-muted-foreground'}"
	>
		<svelte:component this={icon} />
		{name}
	</a>
{/snippet}
{#snippet hamItem({ name, url, icon, selected })}
	<a
		href={url}
		class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground {selected
			? 'bg-muted text-foreground'
			: ' text-muted-foreground'}"
		{onclick}
	>
		<svelte:component this={icon} />
		{name}
	</a>
{/snippet}
{#if !hamburger}
	<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
		{#each gfnav as n}
			{@render navItem({ url: n.url, name: n.name, icon: n.icon, selected: url.includes(n.url) })}
		{/each}
	</nav>
{:else}
	<nav class="grid gap-2 text-lg font-medium">
		<div>
			<a href="/" class="flex items-center gap-2 text-lg font-semibold" {onclick}>
				<img src="/kettu.png" alt="" class="h-8 w-8 object-contain" />
				<span>GF Vihko</span>
			</a>

			{#each gfnav as n}
				{@render hamItem({ url: n.url, name: n.name, icon: n.icon, selected: url.includes(n.url) })}
			{/each}
		</div>
	</nav>
{/if}
