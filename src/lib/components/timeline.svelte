<script lang="ts">
	import * as d3 from 'd3';
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	import TimeElement from './timeElement.svelte';
	import TimeWeek from './timeWeek.svelte';
	import TimeToday from './timeToday.svelte';
	import groupby from 'core-js/actual/array/group-by';
	import TimeTitle from './timeTitle.svelte';
	import { dateStore } from '@melt-ui/svelte/internal/helpers/date';

	dayjs.extend(isoWeek);
	let { tasks, class: _class = '', item = false } = $props();
	let width = $state(1000);

	let tasksByType = $state();

	tasksByType = groupby(tasks, ({ type }) => type);
	const tasksByType2 = Object.entries(tasksByType).map(([key, value]) => {
		return { type: key, tasks: value };
	});

	let container;
	let nbWeeks = 3;
	let lineHeight = 40;
	let startOfWeek = dayjs().startOf('isoWeek').toDate();
	let height = $state(tasksByType2.length * lineHeight);
	let x = $derived(
		d3.scaleTime([addDays(startOfWeek, -7), addDays(startOfWeek, nbWeeks * 7)], [0, width])
	);
	let xScroll = $state(0);
	const now = new Date();
	let dayLen = $derived(x(addDays(now, 1)) - x(now));
	const today = dayjs().startOf('date');
	function strToDate(str) {
		var arr = str.split('.');
		return new Date(arr[2], arr[1] - 1, arr[0]);
	}
	function addDays(date, days) {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}
	function onScroll() {
		xScroll = container.scrollLeft;
	}
	console.log('ss', dayjs(today).add(1, 'd').toDate());
</script>

<div bind:this={container} onscroll={onScroll} class="w-full overflow-x-auto">
	<div bind:clientWidth={width} style="min-width: {(nbWeeks + 1) * 150}px;">
		<svg {width} height={height + lineHeight} xmlns="http://www.w3.org/2000/svg">
			{#each Array(nbWeeks + 1) as w, i}
				<TimeWeek
					dayLength={dayLen}
					start={dayLen * 7 * i}
					height={height + lineHeight}
					text={`${addDays(startOfWeek, (i - 1) * 7).toLocaleDateString('fi')} w${dayjs(addDays(startOfWeek, (i - 1) * 7)).isoWeek()}`}
				/>
			{/each}
			<TimeToday length={dayLen} {height} x={x(today)} />
			{#each tasksByType2 as type, j}
				{#each type.tasks as task, i}
					<TimeElement
						start={x(strToDate(task.startDate))}
						length={x(addDays(strToDate(task.endDate), 1)) - x(strToDate(task.startDate))}
						y={40 * j}
						status={task.status}
						text={task.item}
					/>
				{/each}
				<TimeTitle x={xScroll} y={40 * j} height={lineHeight} text={type.type} />
			{/each}
		</svg>
	</div>
	<!-- <p>task: {task.item}, start:{strToDate(task.startDate).toLocaleDateString('fi')}</p> -->
</div>
