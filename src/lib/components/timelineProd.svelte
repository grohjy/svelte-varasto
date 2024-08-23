<script lang="ts">
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	import * as Avatar from '$lib/components/ui/avatar';
	import TimeElementProd from './timeElementProd.svelte';
	import { SquarePen } from 'lucide-svelte';

	dayjs.extend(isoWeek);
	let { tasks, nbWeeks, nbWeeksBefore } = $props();
	let minWidth = 399;

	let startOfWeek = dayjs().startOf('isoWeek').toDate();
	let startOfTimeline = dayjs(startOfWeek).add(-nbWeeksBefore, 'w').toDate();
	let endOfTimeline = dayjs(startOfWeek).add(nbWeeks, 'w').toDate();
	let titleWidth = 140;
	let timelineLength = (nbWeeksBefore + nbWeeks) * 7;

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

<div class="h-full w-full overflow-auto">
	<div
		style="
		min-width: {(nbWeeks + nbWeeksBefore) * minWidth + titleWidth}px; 
		display: grid; 
		grid-template-columns: auto repeat({(nbWeeks + nbWeeksBefore) * 7},minmax(0,1fr));
		grid-template-rows:auto repeat({tasks.length},auto);
		"
		class="relative"
	>
		{#each Array(nbWeeksBefore + nbWeeks) as w, i}
			<div
				style="grid-column:{i * 7 + 2}/span 7; grid-row:1;"
				class="sticky top-0 z-20 border-b border-l bg-white bg-opacity-70 backdrop-blur-sm"
			>
				<div class="  p-2">
					{titleStr(startOfWeek, i - nbWeeksBefore)}
				</div>
			</div>

			<div style="grid-column:{i * 7 + 2}/span 5; grid-row:2/-1;" class="border-l bg-white"></div>
			<div style="grid-column:{i * 7 + 2 + 5}/span 2; grid-row:2/-1;" class="bg-slate-100"></div>
		{/each}
		<div
			style="grid-column:{dayjs().diff(startOfTimeline, 'd') + 2}/span 1; grid-row:2/-1;"
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
									<Avatar.Fallback>{task.item?.name.substring(0, 3).toUpperCase()}</Avatar.Fallback>
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
		<div
			style="
		grid-column:1;
		grid-row:1/span 1;
		position:sticky;
		left:0px;
		max-width: {titleWidth}px;
		"
			class="z-20 border-b border-r bg-white bg-opacity-70 backdrop-blur-sm"
		></div>
		{#each tasks as tasktype, i}
			<div
				style="
				grid-column:1;
				grid-row:{i + 2}/span 1;
				position:sticky;
				left:0px;
				max-width: {titleWidth}px;
				"
				class="flex max-w-28 items-center {tasktype.type != ''
					? 'border-b'
					: ''} z-20 border-r bg-white bg-opacity-70 p-2 backdrop-blur-sm"
			>
				<p class="text-md font-medium leading-none">
					{tasktype.type}
				</p>
			</div>
		{/each}
	</div>
</div>
