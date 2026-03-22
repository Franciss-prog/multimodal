<script lang="ts">
	import { page } from '$app/state';

	let menuOpen = $state(false);
	let pathname = $derived(page.url.pathname);
	let isHome = $derived(pathname === '/');

	const navLinks = [
		{ id: 1, name: 'Home', href: '/' },
		{ id: 2, name: 'About', href: '/about' },
		{ id: 3, name: 'Forums', href: '/discussion' }
	];
</script>

<nav class="relative z-30 px-4 pt-4 md:px-8 md:pt-6 lg:px-14">
	<div
		class="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3 md:px-6 md:py-4"
	>
		<div class="flex items-center gap-3">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/65 bg-white/10 backdrop-blur-sm lg:h-12 lg:w-12"
			>
				<a href="/" class="text-lg lg:text-xl {isHome ? 'text-emerald-200' : 'text-[#3f9f4b]'}"
					>🌿</a
				>
			</div>
		</div>

		<ul
			class="hidden items-center gap-8 px-1 py-2 text-sm font-semibold tracking-wide md:flex lg:gap-10 lg:text-base"
		>
			{#each navLinks as { id, name, href } (id)}
				<li>
					<a
						{href}
						class={`${
							pathname === href
								? isHome
									? 'text-emerald-200'
									: 'text-[#2f8a50]'
								: isHome
									? 'text-white/85 hover:text-emerald-200'
									: 'text-gray-500 hover:text-[#3f9f4b]'
						} transition-colors`}>{name}</a
					>
				</li>
			{/each}
		</ul>

		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="flex flex-col gap-1.5 rounded-xl p-2 md:hidden {isHome
				? 'bg-black/20'
				: 'bg-emerald-50'}"
			aria-label="Toggle menu"
		>
			<span class="block h-0.5 w-6 transition-all {isHome ? 'bg-white' : 'bg-gray-700'}"></span>
			<span class="block h-0.5 w-6 transition-all {isHome ? 'bg-white' : 'bg-gray-700'}"></span>
			<span class="block h-0.5 w-6 transition-all {isHome ? 'bg-white' : 'bg-gray-700'}"></span>
		</button>
	</div>

	{#if menuOpen}
		<div
			class="absolute top-full right-4 left-4 z-50 mt-2 rounded-2xl border shadow-lg backdrop-blur md:hidden {isHome
				? 'border-white/30 bg-black/45'
				: 'border-emerald-100 bg-white/95'}"
		>
			<ul
				class="flex flex-col px-6 py-3 text-sm font-semibold tracking-wide {isHome
					? 'text-white/90'
					: 'text-gray-500'}"
			>
				{#each navLinks as { name, href, id } (id)}
					<li class="py-1">
						<a
							{href}
							class={`${
								pathname === href
									? isHome
										? 'text-emerald-200'
										: 'text-[#2f8a50]'
									: isHome
										? 'hover:text-emerald-200'
										: 'hover:text-[#3f9f4b]'
							}`}>{name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>
