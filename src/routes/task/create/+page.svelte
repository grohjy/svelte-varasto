<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Create a new task {$page.url.searchParams.get('item')}</h1>
<form method="post" action="create?item=2">
	<Button type="submit" variant="outline">Create</Button>
</form>
