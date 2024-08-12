<script lang="ts">
	// import '../../app.css';

	let { data, children } = $props();
</script>

<div class=" grid min-h-dvh w-full overflow-auto">
	{@render children()}
</div>
