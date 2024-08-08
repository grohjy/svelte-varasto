<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
	import { search } from '$lib/stores.svelte.js';
	search.active = false;
	search.value = '';
</script>

<h2>Create task from item</h2>
