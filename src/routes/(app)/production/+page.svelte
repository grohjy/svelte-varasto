<script lang="ts">
	import TimelineProd from '$lib/components/timelineProd.svelte';
	import { search } from '$lib/stores.svelte.js';

	let { data } = $props();
	search.active = true;
	search.value = '';
	let tasksByType = $derived.by(() => {
		let arr = data.tasksByType2.filter(({ type, tasks }) => {
			const found = search.cleanedValues.every((value) => {
				return type.toLowerCase().includes(value);
				// tasks.name.toLowerCase().includes(value) ||
				// task.type?.type?.toLowerCase().includes(value) ||
				// task.type?.subtype?.toLowerCase().includes(value)
			});
			return found;
		});
		return arr;
	});
</script>

<div class="border-2">
	<!-- <p>{JSON.stringify(tasksByType, null, 2)}</p> -->
	<TimelineProd tasks={tasksByType} nbWeeks={data.nbWeeks} nbWeeksBefore={data.nbWeeksBefore} />
</div>
