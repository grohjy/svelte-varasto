<script lang="ts">
	import TimelineProd from '$lib/components/timelineProd.svelte';
	import { search } from '$lib/stores.svelte.js';
	import groupby from 'core-js/actual/array/group-by';

	let { data } = $props();
	search.active = true;
	search.value = '';
	let tasksByType2 = $derived.by(() => {
		let arr = data.tasks.filter((task) => {
			const found = search.cleanedValues.every((value) => {
				return (
					task.item?.name.toLowerCase().includes(value) ||
					task.status?.status.toLowerCase().includes(value) ||
					task.type?.type?.toLowerCase().includes(value) ||
					task.type?.subtype?.toLowerCase().includes(value)
				);
			});
			return found;
		});
		// console.log('aarr1', JSON.stringify(data.tasks, null, 2));
		// console.log('aarr', search.value, JSON.stringify(arr, null, 2));
		// return arr;
		const tasksByType = groupby(arr, ({ type }) => type.subtype);
		const taskByType2 = Object.entries(tasksByType).map(([key, value]) => {
			return { type: key, tasks: value };
		});
		let newGroups = [];
		taskByType2.forEach((group) => {
			let subgroups = [{ type: group.type, tasks: [] }];
			let tasks = group.tasks;
			tasks.forEach((nextTask) => {
				let fits = true;
				let handled = false;
				subgroups.forEach((subgr) => {
					if (!handled) {
						subgr.tasks.forEach((subtask) => {
							if (nextTask.startDate <= subtask?.endDate && nextTask.endDate >= subtask?.startDate)
								fits = false;
							else fits = true;
						});
						if (fits) {
							subgr.tasks.push(nextTask);
							handled = true;
						}
					}
				});
				!fits && subgroups.push({ type: '', tasks: [nextTask] });
			});
			newGroups.push(...subgroups);
		});
		// return taskByType2;
		return newGroups;
	});
</script>

<div class="relative h-full border-2">
	<!-- <pre>{JSON.stringify(tasksByType2, null, 2)}</pre> -->
	<TimelineProd tasks={tasksByType2} nbWeeks={data.nbWeeks} nbWeeksBefore={data.nbWeeksBefore} />
</div>
