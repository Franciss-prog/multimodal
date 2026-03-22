<script lang="ts">
	import { page } from '$app/state';

	let pathname = $derived(page.url.pathname);
	let isHome = $derived(pathname === '/');
</script>

<footer class="px-6 pb-6 md:px-10 lg:px-16">
	<div
		class="mx-auto mt-8 flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 border-t px-1 pt-4 text-sm sm:flex-row {isHome
			? 'border-white/25 text-white/85'
			: 'border-emerald-100 text-gray-500'}"
	>
		<p class="font-semibold {isHome ? 'text-emerald-200' : 'text-emerald-700'}">CleanQuest</p>
		<p class={isHome ? 'text-white/80' : 'text-gray-500'}>
			Protecting nature, one discussion at a time.
		</p>
	</div>
</footer>
