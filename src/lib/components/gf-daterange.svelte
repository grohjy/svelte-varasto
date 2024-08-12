<script lang="ts">
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';

	import { melt, createRangeCalendar } from '@melt-ui/svelte';
	import {
		CalendarDate,
		parseAbsolute,
		parseAbsoluteToLocal,
		parseDate,
		parseDateTime
	} from '@internationalized/date';
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	dayjs.extend(isoWeek);

	// dayjs().isoWeek();
	// dayjs().isoWeekday();
	// dayjs().isoWeekYear();
	// const time = dayjs(Date.now()).isoWeekYear();
	// format('YYYYMMDD[T]HHmmssSSS');
	// console.log('dayyjs', time);

	let { value = $bindable() } = $props();
	let defaultValue = value;
	if (!defaultValue || !defaultValue.start || !defaultValue.end) defaultValue = {};
	else {
		defaultValue = {
			start: new CalendarDate(
				defaultValue.start.getFullYear(),
				defaultValue.start.getMonth() + 1,
				defaultValue.start.getDate()
			),
			end: new CalendarDate(
				defaultValue.end.getFullYear(),
				defaultValue.end.getMonth() + 1,
				defaultValue.end.getDate()
			)
		};
	}

	const {
		elements: { calendar, heading, grid, cell, prevButton, nextButton },
		states: { months, headingValue, weekdays },
		helpers: { isDateDisabled, isDateUnavailable }
		//   options: {locale :"fi"} ,
	} = createRangeCalendar({
		weekStartsOn: 1,
		fixedWeeks: true,
		defaultValue,
		onValueChange: onChange
	});
	function onChange({ curr, next }) {
		console.log('whaat', curr, next);
		if (next.start) {
			value = {};
			value.start = next.start.toString();
			value.end = next.end.toString();
			console.log('vaa', value);
		} else value = undefined;
		// console.log('whaat', selectedId, next);

		// changeFromParent = false;
		// selectedId = next?.value;
		return next;
	}
</script>

<section class="w-full">
	<div use:melt={$calendar} class="w-56">
		<header class="mx-2 flex justify-between">
			<button use:melt={$prevButton}>
				<ChevronLeft />
			</button>
			<div use:melt={$heading}>
				{$headingValue}
			</div>
			<button use:melt={$nextButton}>
				<ChevronRight />
			</button>
		</header>
		<div class="">
			{#each $months as month}
				<table use:melt={$grid} class="w-full">
					<thead aria-hidden="true">
						<tr>
							<th>
								<div class="pr-6"></div>
							</th>
							{#each $weekdays as day}
								<th>
									<div class="text-center font-normal text-muted-foreground">
										{day}
									</div>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each month.weeks as dates}
							<tr>
								<td role="gridcell" aria-disabled={false}>
									<div class="text-center font-normal text-muted-foreground">
										{dayjs(dates[0]).isoWeek()}
									</div>
								</td>
								{#each dates as date}
									<td
										role="gridcell"
										aria-disabled={$isDateDisabled(date) || $isDateUnavailable(date)}
									>
										<div use:melt={$cell(date, month.value)} class="text-center">
											{date.day}
										</div>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			{/each}
		</div>
	</div>
</section>

<!-- <style lang="postcss">
	[data-melt-calendar] {
		@apply text-magnum-800 w-full rounded-lg bg-white p-3 shadow-sm;
	}

	header {
		@apply flex items-center justify-between pb-2;
	}

	header + div {
		@apply flex items-center gap-8;
	}

	[data-melt-calendar-prevbutton] {
		@apply hover:bg-magnum-100 rounded-lg p-1 transition-all;
	}

	[data-melt-calendar-nextbutton] {
		@apply hover:bg-magnum-100 rounded-lg p-1 transition-all;
	}

	[data-melt-calendar-heading] {
		@apply text-magnum-800 font-semibold;
	}

	th {
		@apply text-magnum-800 text-sm font-semibold;

		& div {
			@apply flex h-6 w-6 items-center justify-center p-4;
		}
	}

	[data-melt-calendar-grid] {
		@apply w-full;
	}

	[data-melt-calendar-cell] {
		@apply hover:bg-magnum-100 focus:ring-magnum-400 data-[highlighted]:bg-magnum-200 data-[range-highlighted]:bg-magnum-200 data-[selected]:bg-magnum-300 data-[selected]:text-magnum-900 flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4 focus:ring data-[outside-month]:pointer-events-none data-[outside-visible-months]:pointer-events-none data-[outside-month]:cursor-default data-[outside-visible-months]:cursor-default data-[disabled]:opacity-40 data-[outside-month]:opacity-40 data-[outside-visible-months]:opacity-40 data-[outside-month]:hover:bg-transparent data-[outside-visible-months]:hover:bg-transparent;
	}

	[data-melt-calendar-cell][data-outside-month='true'][data-outside-visible-months='true'] {
		@apply opacity-0;
	}

	.input {
		@apply border-magnum-800 flex h-8 w-full rounded-md border bg-transparent px-2.5 text-sm;
		@apply ring-offset-magnum-300 focus-visible:ring;
		@apply focus-visible:ring-magnum-400 focus-visible:ring-offset-1;
		@apply flex-1 items-center justify-center;
		@apply text-magnum-700 px-2.5 text-sm leading-none;
	}

	.trigger {
		@apply inline-flex w-64 items-center justify-center rounded bg-white p-0 px-2 py-1 text-sm font-medium;
		@apply text-magnum-900 transition-colors hover:bg-white/90;
		@apply focus-visible:ring-magnum-400 focus-visible:ring focus-visible:ring-offset-2;
	}

	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply text-magnum-900 hover:bg-magnum-500/10 transition-colors;
		@apply focus-visible:ring-magnum-400 focus-visible:ring focus-visible:ring-offset-2;
		@apply bg-white p-0 text-sm font-medium;
	}

	.button {
		@apply flex h-6 w-6 items-center justify-center rounded-full;
		@apply text-magnum-900 hover:bg-magnum-500/10 transition-colors;
		@apply focus-visible:ring-magnum-400 focus-visible:ring-1;
		@apply bg-white p-0 text-sm font-medium;
	}

	.content {
		@apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm;
	}

	.buttons-wrapper {
		@apply border-magnum-700 flex items-center justify-between border-y py-1;
	}

	.cell {
		@apply hover:bg-magnum-100 focus:ring-magnum-400 flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded p-4 focus:ring;
	}

	.segment {
		@apply data-[segment="dayPeriod"]:pl-0.5 data-[segment="hour"]:pl-1 data-[segment="timeZoneName"]:pl-1;
	}

	.btn {
		@apply bg-magnum-600 rounded p-1 text-xs text-white;
	}
</!-->

<style>
	[data-melt-calendar-cell][data-today] {
		border: 2px solid red;
		border-radius: 5px;
	}
	[data-melt-calendar-cell] {
		border: 1px solid black;
		border-radius: 5px;
	}
	[data-melt-calendar-cell][data-selected] {
		background-color: lightgreen;
	}
	/* [data-melt-calendar-cell][data-selection-start] {
		background-color: lightcoral;
	} */
	/* [data-melt-calendar-cell][data-selection-end] {
		background-color: yellowgreen;
	} */
	[data-melt-calendar-cell][data-highlighted] {
		background-color: lightcoral;
	}
	[data-melt-calendar-cell][data-outside-month] {
		opacity: 0.3;
	}

	/* [data-melt-calendar-cell][data-outside-month='true'][data-outside-visible-months='true'] {
		background-color: pink;
	} */
	/* [data-melt-calendar-cell][data-disabled] {
		background-color: salmon;
	} */

	/* [data-melt-calendar-cell][data-unavailable] {
		background-color: yellowgreen;
	} */

	/* [data-melt-calendar-cell][data-outside-visible-months] {
		background-color: blue;
	} */
</style>
