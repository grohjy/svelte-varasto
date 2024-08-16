<script lang="ts">
	import * as d3 from 'd3';
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	import TimeElement from './timeElement.svelte';
	import TimeWeek from './timeWeek.svelte';
	import TimeToday from './timeToday.svelte';
	import groupby from 'core-js/actual/array/group-by';
	import TimeTitle from './timeTitle.svelte';
	import TimeElementSales from './timeElementSales.svelte';
	import TimeWeekSales from './timeWeekSales.svelte';
	import TimeTitleSales from './timeTitleSales.svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	dayjs.extend(isoWeek);
	let { items, nbWeeks, nbWeeksBefore } = $props();
	let width = $state(1000);
	let minWidth = 200;

	// let tasksByType = $state();

	// tasksByType = groupby(tasks, ({ type }) => type);
	// const tasksByType2 = Object.entries(tasksByType).map(([key, value]) => {
	// 	return { type: key, tasks: value };
	// });

	let container;
	let lineHeight = 60;
	let headerHeight = 30;
	let startOfWeek = dayjs().startOf('isoWeek').toDate();
	let height = $derived(items.length * lineHeight);
	let x = $derived(
		d3.scaleTime(
			[addDays(startOfWeek, -nbWeeksBefore * 7), addDays(startOfWeek, nbWeeks * 7)],
			[0, width]
		)
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
	function evenMonth(date) {
		let monthNb = dayjs(date).month() + 1;
		return monthNb % 2 == 0;
	}
</script>

<div bind:this={container} onscroll={onScroll} class="w-full overflow-x-auto">
	<div
		bind:clientWidth={width}
		style="min-width: {(nbWeeks + nbWeeksBefore) * minWidth}px; height:{lineHeight * items.length +
			headerHeight * 2}px"
		class="relative"
	>
		<div class="absolute h-full w-full">
			{#each Array(nbWeeks + nbWeeksBefore) as w, i}
				<TimeWeekSales
					dayLength={dayLen}
					start={dayLen * 7 * i}
					height={height + headerHeight * 2}
					{headerHeight}
					even={evenMonth(dayjs(startOfWeek).add(-nbWeeksBefore + i, 'w'))}
					text={`${addDays(startOfWeek, (i - nbWeeksBefore) * 7).toLocaleDateString('fi', { day: 'numeric', month: 'numeric' })} w${dayjs(addDays(startOfWeek, (i - 1) * 7)).isoWeek()}`}
				/>
			{/each}
			<TimeToday length={dayLen} height={height + headerHeight * 2} x={x(today)} />
		</div>
		<div
			class="absolute w-full"
			style="height:{lineHeight * items.length}px; top:{headerHeight}px; "
		>
			{#each items as item, j}
				{#each item.tasks as task, i}
					<a href="/task/{task.id}/edit?href=/sales">
						<TimeElementSales
							start={x(dayjs(task.startDate).startOf('date'))}
							length={x(addDays(new Date(task.endDate), 1)) - x(new Date(task.startDate))}
							height={lineHeight}
							y={lineHeight * j}
							type={task.type?.type}
							subtype={task.type?.subtype}
							status={task.status?.status}
							id={task.id}
						>
							<div class="space-y-1">
								<p class="text-sm font-medium leading-none">
									{task.id}-{task.name}
								</p>
								{#if task.qty}
									<p class="text-sm text-muted-foreground">
										{task.qty.toLocaleString('fi')}pcs
									</p>
								{/if}
							</div>
						</TimeElementSales>
					</a>
				{/each}
				<TimeTitleSales x={xScroll} y={lineHeight * j} height={lineHeight}>
					<div class="flex h-full items-center p-1 pr-2 hover:bg-slate-50">
						<a href="/item/{item.id}">
							<Avatar.Root class="h-12 w-12  rounded-sm ">
								<Avatar.Image src={item.thumb} alt="Thumbnail" />
								<Avatar.Fallback>{item.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
						</a>
						<div class="ml-2 space-y-1">
							<a href="/item/{item.id}" class="hover:underline">
								<p class="text-sm font-medium leading-none">
									{item.id}-{item.name}
								</p>
							</a>
							{#if item.parentItems[0]}
								<p class="text-sm text-muted-foreground">
									<a href="/item/{item.parentItems[0]?.parent?.id}" class="hover:underline">
										<span
											>{item.parentItems[0]?.parent?.id}-{item.parentItems[0]?.parent?.name}</span
										>
									</a>
								</p>
							{/if}
						</div>
					</div>
				</TimeTitleSales>
			{/each}
			<!-- <svg {width} height={height + headerHeight * 2} xmlns="http://www.w3.org/2000/svg">
					</svg> -->
		</div>
	</div>
	<!-- <p>task: {task.item}, start:{strToDate(task.startDate).toLocaleDateString('fi')}</p> -->
</div>
