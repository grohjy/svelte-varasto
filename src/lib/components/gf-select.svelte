<script lang="ts">
	import { Check, ChevronDown } from 'lucide-svelte';
	// import { Check, ChevronDown } from '$icons/index.js';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	// const options = [
	// 	{ fla: 'Caramel', id: 1 },
	// 	{ fla: 'Strawberry', id: 2 },
	// 	{ fla: 'Cookies & Cream', id: 3 }
	// ];
	export let options: { id: number; name: string }[];
	export let name;
	const {
		elements: { trigger, menu, option, group, groupLabel, label, hiddenInput },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect<string>({
		forceVisible: true
		// positioning: {
		// 	placement: 'bottom',
		// 	fitViewport: true,
		// 	sameWidth: true
		// }
	});
</script>

<div class="flex flex-col gap-1">
	<input type="hidden" {name} use:melt={$hiddenInput} />
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="block text-slate-900" use:melt={$label}>Customer</label>
	<button
		class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2
    text-slate-700 shadow transition-opacity hover:opacity-90"
		use:melt={$trigger}
		aria-label="Food"
	>
		{$selectedLabel || 'Select a customer'}
		<ChevronDown class="size-5" />
	</button>
	{#if $open}
		<div
			class=" z-10 flex max-h-[300px] flex-col
      overflow-y-auto rounded-lg bg-white p-1
      shadow focus:!ring-0"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#each options as opt}
				<div
					class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800 hover:bg-slate-100 focus:z-10 focus:text-slate-700 data-[highlighted]:bg-slate-200 data-[highlighted]:text-slate-900 data-[disabled]:opacity-50"
					use:melt={$option({ value: opt.id, label: opt.name })}
				>
					<div class="check {$isSelected(opt.id) ? 'inline-block' : 'hidden'}">
						<Check class="size-4" />
					</div>

					{opt.name}
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- <style lang="postcss">
    .check {
      position: absolute;
      left: theme(spacing.2);
      top: 50%;
      z-index: theme(zIndex.20);
      translate: 0 calc(-50% + 1px);
      color: theme(colors.slate.500);
    }
  </style> -->
