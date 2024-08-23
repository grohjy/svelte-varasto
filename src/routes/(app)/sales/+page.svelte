<script lang="ts">
	import TimelineSales from '$lib/components/timelineSales.svelte';
	import { search } from '$lib/stores.svelte.js';
	import groupby from 'core-js/actual/array/group-by';

	let { data } = $props();
	search.active = true;
	search.value = '';
	let items = $derived.by(() => {
		const filteredItems = data.items.filter((item) => {
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

		let newGroups = [];
		filteredItems.forEach((group) => {
			let tasks = group.tasks;
			const tasksByType = groupby(tasks, ({ type }) => type.type);

			const taskByType2 = Object.entries(tasksByType).map(([key, value]) => {
				return { type: key, tasks: value };
			});

			taskByType2.forEach((type) => {
				let subgroups = [{ ...group, group: group.tasks[0]?.type?.type, tasks: [] }];
				// console.log('aasa', type.type);
				// if (type.type == 'factory') {
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
					// console.log('newEL', newEl);

					// subgroups.push(newEl);
					!fits && subgroups.push(newEl);
				});
				newGroups.push(...subgroups);
				// console.log('sss2', ...subgroups);
				// }
			});
		});
		// console.log('newgrr', JSON.stringify(newGroups, null, 2));

		return newGroups;
		return filteredItems;
	});
</script>

<div class="border-2">
	<TimelineSales {items} nbWeeks={data.nbWeeks} nbWeeksBefore={data.nbWeeksBefore} />
</div>
