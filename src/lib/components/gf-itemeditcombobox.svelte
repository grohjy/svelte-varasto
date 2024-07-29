<script lant="ts">
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import GfCombobox from './gf-combobox.svelte';
	// import { Button } from '$lib/components/ui/button/index';

	let { options, item = $bindable(), class: _class } = $props();
	// console.log('iteeem', item);
	// if (!item) item = {};
	// if (!item.itemCount) item.itemCount = 1;
	// if (!item.unitsCount) item.unitsCount = 1;
	// if (!item.unit) item.unit = 'pcs';
	// let item2 = $state({ id: 1, itemCount: 1, unitsCount: 1, unit: 'kg' });
	// let selected;
	// let iid = $state(item.id);
	// let combo2;
	// function add() {
	// console.log('addd', item2);
	// onAdd({ ...item2 });
	// }
	// export function reset(newI = {}) {
	// 	item2 = { itemCount: 1, unitsCount: 1, unit: 'kg', ...newI };
	// 	combo2.reset(item2.id);
	// }
</script>

<div class={_class}>
	<div class="grid grid-cols-5 gap-2">
		<!-- <pre>aa{JSON.stringify(item)}</pre> -->
		<div class="col-span-2">
			<GfCombobox {options} bind:selectedId={item.id} />
		</div>
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
		<!-- <Button variant="ghost" onclick={add}>Add</Button> -->
	</div>
</div>
