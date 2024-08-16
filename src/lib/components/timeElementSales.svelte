<script lang="ts">
	import { onMount } from 'svelte';

	let { start = 0, length, height, y, type, subtype, status, id, children } = $props();
	// let width = $state(end - start);
	let bgColor;
	let borderDashed;
	let clicked = $state(false);
	// let margin = 20;
	// let top = y;

	if (type == 'order') {
		switch (subtype) {
			case 'forecast':
				bgColor = 'bg-white';
				break;
			case 'preorder':
				bgColor = 'bg-yellow-200';
				break;
			case 'order':
				bgColor = 'bg-green-200';
				break;
			case 'partial delivery':
				bgColor = 'bg-blue-200';
				break;
			case 'delivered':
				bgColor = 'bg-slate-400';
				break;

			default:
				break;
		}
	} else {
		// top = y + 20;
		borderDashed = 'border-dashed';
		switch (status) {
			case 'draft':
				bgColor = 'bg-white';
				break;
			case 'open':
				bgColor = 'bg-green-200';
				break;
			case 'closed':
				bgColor = 'bg-slate-400';
				break;
		}
	}
	let rect;
</script>

<div
	style="width:{length}px; top:{y}px; left:{start}px; height:{height}px; white-space:nowrap;padding:6px; "
	class=" absolute flex"
>
	<div
		style=" "
		class="flex h-full w-full items-center rounded-sm border-2 border-slate-600 {borderDashed
			? borderDashed
			: ''} pl-1 {bgColor} opacity-80"
	>
		{@render children()}
	</div>
</div>

<!-- <g transform="translate({start} {y})">
	<rect
		width={length - margin * 2}
		height={40 - margin * 2}
		x={margin}
		y={margin}
		rx="3"
		ry="3"
		style="fill:{fill};opacity:0.8;stroke:{stroke ? stroke : 'black'};stroke-width:2;"
	/>
	<text x={margin + 4} y="25" fill="">{text}</text>
</g> -->
