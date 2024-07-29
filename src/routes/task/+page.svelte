<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="prose">
	<h1>Tasks:</h1>
	<form method="post" action={`task/create?item=3`}>
		<Button type="submit" variant="outline">Create</Button>
	</form>
	{#each data.tasks as task}
		<a href="task/{task.id}">
			<pre>{JSON.stringify(task, null, 2)}</pre>
		</a>
	{/each}
</div>
