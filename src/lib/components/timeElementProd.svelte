<script lang="ts">
	let { children, start, end, row, status } = $props();
	start = start < 0 ? 0 : start;
	let endOver = false;
	if (end < 0) {
		endOver = true;
		end = -end;
	}
	let bgColor;

	switch (status) {
		case 'draft':
			bgColor = 'bg-white';
			break;
		case 'open':
			bgColor = 'bg-green-200';
			break;
		case 'closed':
			bgColor = 'bg-slate-400';
			break;
	}
</script>

<div
	style="grid-column:{start + 1}/{end + 2};
    grid-row:{row}; "
	class="z-10 px-1 py-2 {start == 0 ? 'pl-[1px]' : ''} {endOver ? 'pr-0' : ''}"
>
	<div
		class=" h-full whitespace-nowrap rounded-sm
        {start == 0 ? 'rounded-l-none border-l-0' : ''} 
        {endOver ? 'rounded-r-none border-r-0' : ''} 
        border border-black {bgColor} bg-opacity-80 hover:outline hover:outline-1"
	>
		{@render children()}
	</div>
</div>
