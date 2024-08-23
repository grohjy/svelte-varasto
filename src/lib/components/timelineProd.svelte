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
	import TimeElementProd from './timeElementProd.svelte';
	import { SquarePen } from 'lucide-svelte';

	dayjs.extend(isoWeek);
	let { tasks, nbWeeks, nbWeeksBefore } = $props();
	// let width = $state(1000);
	let minWidth = 399;

	let container;
	let lineHeight = 60;
	let headerHeight = 30;
	let startOfWeek = dayjs().startOf('isoWeek').toDate();
	let startOfTimeline = dayjs(startOfWeek).add(-nbWeeksBefore, 'w').toDate();
	let endOfTimeline = dayjs(startOfWeek).add(nbWeeks, 'w').toDate();
	let titleWidth = 130;
	// console.log('eend', endOfTimeline);

	let timelineLength = (nbWeeksBefore + nbWeeks) * 7;
	let height = $derived(tasks?.length * lineHeight);
	// let x = $derived(
	// 	d3.scaleTime(
	// 		[addDays(startOfWeek, -nbWeeksBefore * 7), addDays(startOfWeek, nbWeeks * 7)],
	// 		[0, width]
	// 	)
	// );
	let xScroll = $state(0);
	// const now = new Date();
	// let dayLen = $derived(x(addDays(now, 1)) - x(now));
	// const today = dayjs().startOf('date');
	// function strToDate(str) {
	// 	var arr = str.split('.');
	// 	return new Date(arr[2], arr[1] - 1, arr[0]);
	// }
	// function addDays(date, days) {
	// 	const result = new Date(date);
	// 	result.setDate(result.getDate() + days);
	// 	return result;
	// }
	function onScroll() {
		xScroll = container.scrollLeft;
	}
	// function evenMonth(date) {
	// 	let monthNb = dayjs(date).month() + 1;
	// 	return monthNb % 2 == 0;
	// }
	function titleStr(date, nbWeeks) {
		let str = `${dayjs(date)
			.add(nbWeeks, 'w')
			.toDate()
			.toLocaleDateString('fi', { day: 'numeric', month: 'numeric' })} w${dayjs(date)
			.add(nbWeeks, 'w')
			.isoWeek()}`;
		return str;
	}
</script>

<!-- <div bind:this={container} onscroll={onScroll} class="w-full overflow-x-auto"> -->
<!-- bind:clientWidth={width} -->
<div class="absolute bottom-0 top-0 w-full overflow-auto">
	<div
		style="
		min-width: {(nbWeeks + nbWeeksBefore) * minWidth + titleWidth}px; 
		display: grid; 
		grid-template-columns: auto 1fr;
		"
		class="relative"
	>
		<div
			style="
		grid-column:2; 
		grid-row:1;
		display: grid; 
		grid-template-columns:repeat({nbWeeks + nbWeeksBefore},1fr);
		
		"
			class="sticky top-0 z-20 border-b bg-white bg-opacity-90"
		>
			{#each Array(nbWeeksBefore + nbWeeks) as w, i}
				<div style="grid-column:{i + 1};" class="border-l">
					<div class=" p-2">{titleStr(startOfWeek, i - nbWeeksBefore)}</div>
				</div>
			{/each}
		</div>

		<div
			style="
			grid-column:2; 
			grid-row:2;
			display: grid; 
			grid-template-columns:repeat({nbWeeks + nbWeeksBefore},1fr);
		"
			class="relative border"
		>
			{#each Array(nbWeeksBefore + nbWeeks) as w, i}
				<div style="display: grid;grid-template-columns: 5fr 2fr;grid-column:{i + 1};" class="">
					<div class=" col-start-2 bg-slate-100"></div>
				</div>
			{/each}
		</div>

		<div
			style="display: grid; 
					grid-template-columns: repeat({(nbWeeks + nbWeeksBefore) * 7},minmax(0, 1fr));
					grid-template-rows: repeat({tasks.length},minmax(0, 1fr));
					grid-column:2/{nbWeeks + nbWeeksBefore + 2};grid-row:2;"
			class=""
		>
			<div
				style="grid-column:{dayjs().diff(startOfTimeline, 'd') + 1}/span 1; grid-row:1/-1;"
				class=" mx-1 bg-red-300 bg-opacity-30"
			></div>
			{#each tasks as tasktype, i}
				{#each tasktype.tasks as task (task.id)}
					<TimeElementProd
						start={dayjs(task.startDate).diff(startOfTimeline, 'd')}
						end={dayjs(endOfTimeline).diff(task.endDate, 'd') > 0
							? dayjs(task.endDate).diff(startOfTimeline, 'd')
							: -timelineLength}
						row={i + 1}
						status={task.status.status}
					>
						<div class="flex h-full flex-col">
							<div class="flex gap-2">
								<a href="/task/{task.id}">
									<Avatar.Root class="h-14 w-14  rounded-sm ">
										<Avatar.Image src={task.item?.thumb} alt="Thumbnail" />
										<Avatar.Fallback
											>{task.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback
										>
									</Avatar.Root>
								</a>
								{#if task.status.status == 'open'}
									<a href="/action/create?task={task.id}&href=/production?w=3%26wb=1">
										<SquarePen class="h-8 w-8 p-1" />
									</a>
								{/if}
							</div>
							<div class="  p-1">
								<p class="text-sm font-medium">
									<a href="/task/{task.id}" class="hover:underline">
										{task.id}-{task.name}
									</a>
								</p>
								<p class="text-sm text-muted-foreground">
									<a href="/item/{task.item.id}" class="hover:underline">
										{task.item.id}-{task.item.name}
									</a>
								</p>
								{#if task.qty > 0}
									<p class="text-sm text-muted-foreground">
										qty:{task.qty}
									</p>
								{/if}
							</div>
						</div>
					</TimeElementProd>
				{/each}
			{/each}
		</div>
		<div
			style="display: grid; 
				grid-template-rows: repeat({tasks.length},minmax(0,1fr));
				grid-column:1;grid-row:2;
				position:sticky;
				left:0px
				"
			class="relative z-20 border-b border-r bg-white bg-opacity-90"
		>
			{#each tasks as tasktype, i}
				<div class="flex items-center {tasktype.type != '' ? 'border-t-2' : ''} p-2">
					<p class="text-md font-medium leading-none">
						{tasktype.type}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
