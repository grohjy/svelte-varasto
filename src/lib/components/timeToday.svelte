<script lang="ts">
	let { length, height, x } = $props();
	let margin = 8;
</script>

<div
	style="width:{length}px; top:0; left:{x}px; height:{height -
		margin * 2}px;  margin-top:{margin}px;margin-bottom:{margin}px;"
	class="absolute bg-red-300 opacity-40"
></div>

<!-- <rect width={length} {height} {x} y="0" style="fill:pink;" /> -->
