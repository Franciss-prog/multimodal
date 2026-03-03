<script lang="ts">
	import Discussion from '$lib/components/Discussion.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<Discussion discussions={data.discussions} {form} />
