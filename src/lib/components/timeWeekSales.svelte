<script lang="ts">
	let { dayLength, height, start, text, even = false, headerHeight } = $props();
	// let dayLen = $derived(dayLength / 7);
	// console.log('len', dayLength, dayLen);
	let margin = 0;
	let width = $derived(dayLength * 7 - 2 * margin);
	let height2 = $derived(height - 2 * margin);
</script>

<div
	style="width:{width}px; top:0; left:{start}px; height:{height2}px; white-space:nowrap;margin:{margin}px "
	class="absolute flex flex-col justify-end overflow-hidden bg-white"
>
	<div class="flex items-center pl-2" style="height:{headerHeight}px">
		{text}
	</div>
	<div
		style=" "
		class=" grow border-2 border-r-0 border-gray-300 {even ? 'bg-slate-100' : 'bg-white'}"
	>
		<!-- <div style="width:{dayLength * 5}px;" class=" h-full border-r-2"></div> -->
	</div>
	<div class="flex items-center pl-2" style="height:{headerHeight}px">
		{text}
	</div>
</div>

<!-- <g transform="translate({start} {0})">
	<rect width={dayLength * 5} height={height - 40} x="0" y="0" style="fill:none;" />
	<rect
		width={dayLength * 2}
		height={height - 40}
		x={dayLength * 5}
		y="0"
		style="fill:lightgrey;"
	/>
	<line
		x1="0"
		y1={height - 39}
		x2={dayLength * 7}
		y2={height - 39}
		style="stroke-width:2;stroke:grey;"
	/>
	<line x1="0" y1={0} x2={0} y2={height - 20} style="stroke-width:2;stroke:grey;" />
	<text x={dayLength * 0.5} y={height - 15} fill="">{text}</text>
</g> -->
