<script lang="ts">
	import { Check, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { createCombobox, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	type Opt = { value: number; label: string; disabled: boolean };
	export let options: Opt[];
	// export let name;
	export let selectedId: number;
	// let selectedOption;
	let changeFromParent = true;

	$: selectedId, updateSelected();
	function updateSelected() {
		// console.log('selee', selectedId);

		if (changeFromParent) {
			$selected = options.find((item) => item.value == selectedId);
		}
		changeFromParent = true;
	}
	const {
		elements: { menu, input, option, label, hiddenInput },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Opt>({
		forceVisible: true,
		// defaultSelected: selectedOption,
		onSelectedChange: onSel,
		onOpenChange: onOpen,
		loop: false
	});
	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: filteredOptions = $touchedInput
		? options.filter(({ label }) => {
				const normalizedInput = $inputValue.toLowerCase().trim();
				const inputs = normalizedInput.split(' ');
				let found = false;
				found = inputs.every((input) => label.toLowerCase().includes(input));
				return found;
			})
		: options;
	function onOpen({ curr, next }) {
		if (!curr) $inputValue = '';
		// e.preventDefault
		return next;
	}
	function onSel({ curr, next }) {
		// console.log('whaat', selectedId, next);
		// console.log('whaat', selectedId, next);

		changeFromParent = false;
		selectedId = next?.value;
		return next;
	}
	// export function reset(newId = undefined) {
	// 	const selectedOption = options.find((item) => {
	// 		return item.value == newId;
	// 	});
	// 	$selected = selectedOption;
	// }
</script>

<div class="flex flex-col gap-1">
	<!-- <pre>a:{selectedId}, c:{JSON.stringify($selected)}</pre> -->
	<!-- <input type="hidden" {name} use:melt={$hiddenInput} /> -->

	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<!-- <label use:melt={$label}>
		<span class="text-sm font-medium text-slate-900">Item:</span>
	</label> -->

	<div class="relative">
		<input
			use:melt={$input}
			class="flex h-10 w-full items-center justify-between rounded-lg
          border border-input bg-white px-3 pr-12 text-black"
			placeholder="Select..."
		/>
		<div class="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-slate-900">
			{#if $open}
				<ChevronUp class="size-4" />
			{:else}
				<ChevronDown class="size-4" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<ul
		class=" z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg border border-input"
		use:melt={$menu}
		transition:fly={{ duration: 300, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="flex max-h-full flex-col gap-0 overflow-y-auto bg-slate-50 px-2 py-2 text-black"
			tabindex="0"
		>
			{#each filteredOptions as opt (opt.value)}
				<li
					use:melt={$option(opt)}
					class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4
        hover:bg-slate-100
        data-[highlighted]:bg-slate-200 data-[highlighted]:text-slate-900
          data-[disabled]:opacity-50"
				>
					{#if $isSelected(opt.value)}
						<div class="check absolute left-2 top-1/2 z-10 text-slate-900">
							<Check class="size-4" />
						</div>
					{/if}
					<div class="pl-4">
						<span class="font-medium">{opt.label}</span>
						<!-- <span class="block text-sm opacity-75">{manga.author}</span> -->
					</div>
				</li>
			{:else}
				<li class="relative cursor-pointer rounded-md py-1 pl-8 pr-4">No results found</li>
			{/each}
		</div>
	</ul>
{/if}

<!-- <style lang="postcss">
	.check {
		@apply text-slate-500 absolute left-2 top-1/2;
		translate: 0 calc(-50% + 1px);
	}
</style> -->
