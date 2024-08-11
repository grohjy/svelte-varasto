<script lant="ts">
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import GfCombobox from './gf-combobox.svelte';
	// import { Button } from '$lib/components/ui/button/index';

	let { options, item = $bindable(), class: _class, parent = false } = $props();
</script>

<div class={_class}>
	<div class="grid grid-cols-2 items-end gap-2 sm:grid-cols-5">
		<div class="col-span-2">
			<GfCombobox {options} bind:selectedId={item.id} />
		</div>
		{#if !parent}
			<div class="col-span-3 grid grid-flow-col gap-2">
				<div class="grid gap-1">
					<Label for="itemqty">Item qty</Label>
					<Input
						id="itemqty"
						placeholder="item quantity"
						type="text"
						autocapitalize="none"
						autocorrect="off"
						bind:value={item.itemCount}
					/>
				</div>
				<div class="grid gap-1">
					<Label for="unitqty">Unit qty</Label>
					<Input
						id="unitqty"
						placeholder="unit quantity"
						type="text"
						autocapitalize="none"
						autocorrect="off"
						bind:value={item.unitsCount}
					/>
				</div>
				<div class="grid gap-1">
					<Label for="unit">Unit</Label>
					<Input
						id="unit"
						placeholder="unit"
						type="text"
						autocapitalize="none"
						autocorrect="off"
						bind:value={item.unit}
					/>
				</div>
			</div>
		{/if}

		<!-- <Button variant="ghost" onclick={add}>Add</Button> -->
	</div>
</div>
