<script lang="ts">
	import TimelineSales from '$lib/components/timelineSales.svelte';
	import { search } from '$lib/stores.svelte.js';

	let { data } = $props();
	search.active = true;
	search.value = '';
	let items = $derived.by(() => {
		return data.items.filter((item) => {
			const found = search.cleanedValues.every((value) => {
				return (
					item.name.toLowerCase().includes(value) ||
					item.parentItems[0]?.parent.name.toLowerCase().includes(value) ||
					item.parentItems[0]?.parent.type?.type?.toLowerCase().includes(value) ||
					item.parentItems[0]?.parent.type?.subtype?.toLowerCase().includes(value)
				);
			});
			return found;
		});
	});
</script>

<div class="border-2">
	<TimelineSales {items} nbWeeks={data.nbWeeks} nbWeeksBefore={data.nbWeeksBefore} />
</div>
