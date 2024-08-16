<script lang="ts">
	let { x, y, text, height, children } = $props();
	let open = $state(false);
	function jg() {
		open = !open;
	}
</script>

<div
	style=" top:{y}px; left:{x}px; height:{height}px; white-space:nowrap; background-color: rgba(255, 255, 255, 0.95);"
	class=" absolute flex border shadow"
>
	<div style=" " class="flex h-full items-center">
		{@render children()}
	</div>
</div>
<!-- style="background-color: rgba(255, 255, 255, 0.5);" -->
<!-- <g transform="translate({x} {y})"> -->
<!-- <defs>
		<linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
			<stop offset="60%" style="stop-color:white;stop-opacity:0.8" />
			<stop offset="100%" style="stop-color:white;stop-opacity:0" />
		</linearGradient>
	</defs>
	<rect width={70} {height} x="0" y="0" style="fill:url(#grad1);" /> -->
<!-- <rect width={70} {height} x="0" y="0" style="fill:white;opacity:0.9" />

	<text x="5" y="25" fill="">{text}</text> -->
<!-- </g> -->
