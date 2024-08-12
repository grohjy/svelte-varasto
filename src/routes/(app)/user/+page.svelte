<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import GfEditor from '$lib/components/GfEditor.svelte';
	import { handleEditorImages } from '$lib/gfhelpers';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import { search } from '$lib/stores.svelte';

	const { data }: { data: PageData } = $props();
	search.active = false;
	search.value = '';
</script>

<div class=" relative grid grid-cols-1 flex-col items-center justify-center lg:px-0">
	<div class="lg:p-1">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 p-2">
			<div class="flex flex-row justify-between space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">Users:</h1>
			</div>
			{#each data.users as user}
				<a href={'user/' + user.id}>
					<div class="flex items-center p-2 hover:bg-slate-50">
						<div class="ml-4 space-y-1">
							<p class="text-sm font-medium leading-none">
								{user.shortname}
							</p>
							<p class="text-sm text-muted-foreground">{user.firstname} {user.lastname}</p>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
