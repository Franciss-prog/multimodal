<script lang="ts">
	import { page } from '$app/state';
	let menuOpen = $state(false);
	let pathname = $derived(page.url.pathname);
	// create an array of  obj nav links
	const navLinks = [
		{ id: 1, name: 'Home', href: '/' },
		{ id: 2, name: 'About', href: '/about' },
		{ id: 3, name: 'Forums', href: '/discussion' }
	];
</script>

<!-- Nav -->
<nav class="relative flex items-center justify-between px-6 py-4 md:px-10 md:py-6 lg:px-16">
	<div class="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
		<div class="flex items-center gap-3">
			<!-- Logo -->
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#7dd96a] lg:h-12 lg:w-12"
			>
				<a href="/" class="text-lg text-[#5cb85c] lg:text-xl">🌿</a>
			</div>
		</div>

		<!-- Desktop Menu -->
		<ul
			class="hidden items-center gap-10 text-sm font-medium tracking-wide text-gray-500 md:flex lg:gap-12 lg:text-base"
		>
			{#each navLinks as { id, name, href } (id)}
				<li>
					<a {href} class={`${pathname === href ? 'text-[#5cb85c]' : ''}`}>{name} </a>
				</li>{/each}
		</ul>

		<!-- Hamburger Button (mobile only) -->
		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="flex flex-col gap-1.5 p-2 md:hidden"
			aria-label="Toggle menu"
		>
			<span class="block h-0.5 w-6 bg-gray-700 transition-all"></span>
			<span class="block h-0.5 w-6 bg-gray-700 transition-all"></span>
			<span class="block h-0.5 w-6 bg-gray-700 transition-all"></span>
		</button>
	</div>

	<!-- Mobile Dropdown Menu -->
	{#if menuOpen}
		<div class="absolute top-full right-0 left-0 z-50 bg-white shadow-md md:hidden">
			<ul class="flex flex-col px-6 py-2 text-sm font-medium tracking-wide text-gray-500">
				{#each navLinks as { name, href, id } (id)}
					<li>
						<a {href} class={`${pathname === href ? 'text-[#5cb85c]' : 'hover:text-[#5cb85c]'}`}
							>{name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>
