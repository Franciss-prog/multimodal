<script lang="ts">
	import DiscussionThread from '$lib/components/DiscussionThread.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<DiscussionThread discussion={data.discussion} replies={data.replies} {form} />
