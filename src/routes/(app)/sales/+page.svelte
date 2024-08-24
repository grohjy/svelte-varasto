<script lang="ts">
	import TimelineSales from '$lib/components/timelineSales.svelte';
	import TimelineSales2 from '$lib/components/timelineSales2.svelte';
	import { search } from '$lib/stores.svelte.js';
	import groupby from 'core-js/actual/array/group-by';

	let { data } = $props();
	search.active = true;
	search.value = '';
	let items = $derived.by(() => {
		let newGroups = [];
		data.items.forEach((group) => {
			let tasks = group.tasks;
			const tasksByType = groupby(tasks, ({ type }) => type.type);

			const taskByType2 = Object.entries(tasksByType).map(([key, value]) => {
				return { type: key, tasks: value };
			});

			taskByType2.forEach((type) => {
				let subgroups = [{ ...group, first: true, group: group.tasks[0]?.type?.type, tasks: [] }];
				type.tasks.forEach((nextTask) => {
					let fits = true;
					let handled = false;
					subgroups.forEach((subgr) => {
						if (!handled) {
							subgr.tasks.forEach((subtask) => {
								if (
									(nextTask.startDate >= subtask?.startDate &&
										nextTask.startDate <= subtask?.endDate) ||
									(nextTask.endDate >= subtask?.startDate && nextTask.endDate <= subtask?.endDate)
								)
									fits = false;
								else fits = true;
							});
							if (fits) {
								subgr.tasks.push(nextTask);
								handled = true;
							}
						}
					});
					let newEl = { ...group, group: nextTask.type?.type, tasks: [nextTask] };
					!fits && subgroups.push(newEl);
				});
				newGroups.push(...subgroups);
			});
		});
		let firstItem;
		newGroups = newGroups.map((group) => {
			// if (group.id != firstItem) {
			// 	firstItem = group.id;
			// 	group.first = true;
			// }
			if (group.tasks[0].type.type == 'order') group.order = true;
			return group;
		});

		const filteredItems = newGroups.filter((item) => {
			const found = search.cleanedValues.every((value) => {
				return (
					item.name.toLowerCase().includes(value) ||
					item.parentItems[0]?.parent.name.toLowerCase().includes(value) ||
					item.tasks[0].type.type.toLowerCase().includes(value)
				);
			});
			return found;
		});

		// return newGroups;
		console.log('fff', filteredItems);

		return filteredItems;
	});
</script>

<div class="relative h-full border-2">
	<!-- <pre>{JSON.stringify(tasksByType2, null, 2)}</pre> -->
	<TimelineSales2 {items} nbWeeks={data.nbWeeks} nbWeeksBefore={data.nbWeeksBefore} />
</div>

<!-- <div class="border-2">
	<TimelineSales {items} nbWeeks={data.nbWeeks} nbWeeksBefore={data.nbWeeksBefore} />
</div> -->
