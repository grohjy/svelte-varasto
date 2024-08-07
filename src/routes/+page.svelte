<script lang="ts">
	import { page } from '$app/stores';
	import { search } from '$lib/stores.svelte.js';
	let { data } = $props();
	// import { jg } from './+layout.svelte';
	search.active = false;
	search.value = '';
</script>

Etusivu
