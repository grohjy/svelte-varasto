<script lang="ts">
	let { children, start, end, row, type, status } = $props();
	start = start < 0 ? 0 : start;
	let endOver = false;
	if (end < 0) {
		endOver = true;
		end = -end;
	}
	let bgColor, borderProduction;

	if (type.type == 'order') {
		switch (type.subtype) {
			case 'forecast':
				bgColor = 'bg-white';
				break;
			case 'preorder':
				bgColor = 'bg-yellow-200';
				break;
			case 'order':
				bgColor = 'bg-green-200';
				break;
			case 'partial delivery':
				bgColor = 'bg-emerald-500';
				break;
			case 'delivered':
				bgColor = 'bg-slate-400';
				break;

			default:
				break;
		}
	} else {
		// top = y + 20;
		borderProduction = 'border-dashed';
		switch (status) {
			case 'draft':
				bgColor = 'bg-amber-50';
				break;
			case 'open':
				bgColor = 'bg-blue-300';
				break;
			case 'closed':
				bgColor = 'bg-gray-300';
				break;
		}
	}
</script>

<div
	style="grid-column:{start + 2}/{end + 3};
    grid-row:{row + 1}; "
	class="z-10 px-1 py-2 {start == 0 ? 'pl-[1px]' : ''} {endOver ? 'pr-0' : ''}"
>
	<div
		class=" h-full whitespace-nowrap rounded-sm
        {start == 0 ? 'rounded-l-none border-l-0' : ''} 
        {endOver ? 'rounded-r-none border-r-0' : ''} 
        border {borderProduction ? 'border-dashed border-slate-600' : ' border-black'}
		 {bgColor} bg-opacity-80 hover:outline hover:outline-1"
	>
		{@render children()}
	</div>
</div>
