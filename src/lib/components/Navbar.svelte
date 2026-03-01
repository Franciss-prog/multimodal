<script lang="ts">
	import { page } from '$app/stores';
	$: pathname = $page.url.pathname;

	// create  a array of objects for the navigation links
	const navs = [
		{ id: 1, name: 'Home', link: '/' },
		{ id: 2, name: 'About', link: '/about' },
		{ id: 3, name: 'Forums', link: '/discussion' }
	];
</script>

<!-- Nav -->
<nav class="flex items-center justify-between px-10 py-6">
	<div class="flex items-center gap-3">
		<!-- Logo -->
		<div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#7dd96a]">
			<a href="/" class="text-lg text-[#5cb85c]">🌿</a>
		</div>
	</div>
	<ul class="flex items-center gap-10 text-sm font-medium tracking-wide text-gray-500">
		{#each navs as { name, link, id } (id)}
			<li class={pathname === link ? 'text-[#5cb85c]' : ''}><a href={link}>{name}</a></li>{/each}
	</ul>
</nav>
