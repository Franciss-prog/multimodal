<script lang="ts">
	import { page } from '$app/state';
	import DiscussionThread from '$lib/components/DiscussionThread.svelte';

	let id = $derived(page.params.id);
</script>

<DiscussionThread {id} />
