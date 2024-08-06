<script lang="ts">
	import { page } from '$app/stores';
	import { search } from '$lib/stores.svelte.js';
	let { data } = $props();
	// import { jg } from './+layout.svelte';
</script>

<p onclick={() => (search.active = false)}>aa aasad {search.value}</p>
