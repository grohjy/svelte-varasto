<script lang="ts">
	let { start, length, y, status, text } = $props();
	// let width = $state(end - start);
	let fill;
	let clicked = $state(false);
	let margin = 4;
	switch (status) {
		case 'draft':
			fill = 'white';
			break;
		case 'open':
			fill = 'green';
			break;
		case 'closed':
			fill = 'grey';
			break;

		default:
			break;
	}
	let rect;
</script>

<g transform="translate({start} {y})">
	<rect
		width={length - margin * 2}
		height={40 - margin * 2}
		x={margin}
		y={margin}
		rx="3"
		ry="3"
		style="fill:{fill};opacity:0.8;stroke:black;stroke-width:2;"
	/>
	<text x="4" y="25" fill="">{text}</text>
</g>
