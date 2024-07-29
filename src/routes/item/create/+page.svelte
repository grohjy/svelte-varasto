<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Create a new item</h1>
<form method="post" action="create?">
	<Button type="submit" variant="outline">Create</Button>
</form>
