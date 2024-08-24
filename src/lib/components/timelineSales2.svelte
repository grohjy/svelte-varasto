<script lang="ts">
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	import * as Avatar from '$lib/components/ui/avatar';
	// import TimeElementProd from './timeElementProd.svelte';
	import { SquarePen } from 'lucide-svelte';
	import TimeElementSales2 from './timeElementSales2.svelte';
	import { page } from '$app/stores';

	dayjs.extend(isoWeek);
	let { items, nbWeeks, nbWeeksBefore } = $props();
	let minWidth = 200;

	let startOfWeek = dayjs().startOf('isoWeek').toDate();
	let startOfTimeline = dayjs(startOfWeek).add(-nbWeeksBefore, 'w').toDate();
	let endOfTimeline = dayjs(startOfWeek).add(nbWeeks, 'w').toDate();
	let titleWidth = 300;
	let timelineLength = (nbWeeksBefore + nbWeeks) * 7;
	let prevItem;

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
		grid-template-rows:auto repeat({items.length},auto);
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
		{#each items as itemtype, i}
			{#each itemtype.tasks as task (task.id)}
				<TimeElementSales2
					start={dayjs(task.startDate).diff(startOfTimeline, 'd')}
					end={dayjs(endOfTimeline).diff(task.endDate, 'd') > 0
						? dayjs(task.endDate).diff(startOfTimeline, 'd')
						: -timelineLength}
					row={i + 1}
					type={task.type}
					status={task.status?.status}
				>
					<a
						href="/task/{task.id}{itemtype.order
							? '/edit?href=' + $page.url.pathname + $page.url.search.replace('&', '%26')
							: ''}"
						class=""
					>
						<div class="  h-full w-full p-1">
							<p class="text-sm font-medium">
								{task.id}-{task.name}
							</p>
							{#if task.type.type != 'order'}
								<p class="text-sm text-muted-foreground">
									{task.type.type}/{task.type.subtype}
								</p>
							{/if}
							{#if task.qty > 0}
								<p class="text-sm text-muted-foreground">
									qty:{task.qty}
								</p>
							{/if}
						</div>
					</a>
				</TimeElementSales2>
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
		{#each items as item, i}
			<div
				style="
				grid-column:1;
				grid-row:{i + 2}/span 1;
				position:sticky;
				left:0px;
				max-width: {titleWidth}px;
				"
				class="z-20 flex max-w-28 items-center border-r
					{item.order ? 'border-r  bg-white' : ' bg-blue-100'} 
					{item.first ? 'border-t-2' : ''}
					 bg-opacity-70 backdrop-blur-sm"
			>
				{#if item.first}
					<div class="flex h-full items-center p-1 pr-2">
						<a href="/item/{item.id}">
							<Avatar.Root class="h-12 w-12  rounded-sm ">
								<Avatar.Image src={item.thumb} alt="Thumbnail" />
								<Avatar.Fallback>{item.name?.substring(0, 3).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
						</a>
						<div class="ml-2 space-y-1">
							<a href="/item/{item.id}" class="hover:underline">
								<p class="text-sm font-medium leading-none">
									{item.id}-{item.name}
								</p>
							</a>
							{#if item.parentItems && item.parentItems[0]}
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
				{/if}
			</div>
		{/each}
	</div>
</div>
