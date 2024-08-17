<script lang="ts">
	import GfItemedittable from '$lib/components/gf-itemedittable.svelte';
	import GfCombobox from '$lib/components/gf-combobox.svelte';
	import GfEditor from '$lib/components/GfEditor.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import DropImage from '$lib/components/DropImage.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';

	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Command as Cmd } from 'cmdk-sv';
	import GfSelect from '$lib/components/gf-select.svelte';
	import GfItemeditrow from '$lib/components/gf-itemeditrow.svelte';
	import { search } from '$lib/stores.svelte.js';
	search.active = false;
	search.value = '';

	let { data } = $props();
	let selectedItem = $state();
	const items = data.selectableItems.map((item) => {
		let label = `${item.id}-${item.name} (${item.childItems.length} children)`;
		return { value: item.id, label };
	});
</script>

<div class=" relative grid max-w-5xl grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Copy recipe</h1>
				<!-- <p class="text-sm text-muted-foreground">Enter your email below to create your account</p> -->
			</div>

			<div class="grid gap-6">
				<form method="POST" id="formjg">
					<div class="flex items-end gap-2">
						<div class="grid grow gap-1">
							<Label>Item</Label>
							<GfCombobox options={items} bind:selectedId={selectedItem} />
							<input type="hidden" name="item" value={selectedItem} />
						</div>
						<div class="flex justify-end gap-2">
							<Button type="submit" variant="outline">Copy</Button>
						</div>
					</div>
				</form>
			</div>
			<div class="flex justify-end gap-2">
				<Button variant="outline" href={`/item/${$page.params.id}`}>Cancel</Button>
			</div>
		</div>
	</div>
</div>
