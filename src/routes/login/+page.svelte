<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import GfEditor from '$lib/components/GfEditor.svelte';
	import { handleEditorImages } from '$lib/gfhelpers';
	import type { ActionData, PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import { search } from '$lib/stores.svelte';

	const { data, form }: { data: PageData; form: ActionData } = $props();
	// search.active = true;
	// search.value = '';

	// let actions = $derived.by(() => {
	// 	return data.actions.filter((c) => {
	// 		let found = false;
	// 		found = search.cleanedValues.every((value) => {
	// 			return (
	// 				c.type?.type.toLowerCase().includes(value) ||
	// 				c.type?.subtype?.toLowerCase().includes(value) ||
	// 				c.task?.id.toString().toLowerCase().includes(value) ||
	// 				c.task?.name.toLowerCase().includes(value)
	// 			);
	// 		});
	// 		return found;
	// 	});
	// });
</script>

<div class="mt-28 flex flex-col items-center">
	<img src="/kettu.png" alt="" class="h-20 w-20 object-contain" />
	<span class="p-4 text-2xl">GF Vihko</span>
	<form method="POST" action="?/login" id="form">
		<div class="mt-12 grid max-w-64 gap-4">
			<div class="grid gap-1">
				<!-- <Label for="name">Shortname</Label> -->
				<Input
					id="shortname"
					name="shortname"
					placeholder="shortname"
					type="text"
					autocapitalize="none"
					autocorrect="off"
					autocomplete="off"
				/>
			</div>
			<div class="grid gap-1">
				<!-- <Label for="name">Password</Label> -->
				<Input
					id="password"
					name="password"
					placeholder="password"
					type="password"
					autocapitalize="none"
					autocorrect="off"
				/>
			</div>
			<Button type="submit" variant="outline">Login</Button>
			{#if form?.credentials}
				<span class="p-4 text-sm text-red-500">Couldn't log you in</span>
			{/if}
		</div>
	</form>
</div>
