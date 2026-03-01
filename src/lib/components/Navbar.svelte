<script lang="ts">
	let menuOpen = $state(false);
</script>

<!-- Nav -->
<nav class="relative flex items-center justify-between px-6 py-4 md:px-10 md:py-6 lg:px-16">
	<div class="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
		<div class="flex items-center gap-3">
			<!-- Logo -->
			<div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#7dd96a] lg:h-12 lg:w-12">
				<a href="/" class="text-lg text-[#5cb85c] lg:text-xl">🌿</a>
			</div>
		</div>

		<!-- Desktop Menu -->
		<ul class="hidden items-center gap-10 text-sm font-medium tracking-wide text-gray-500 md:flex lg:gap-12 lg:text-base">
			<li><a href="/" class="text-gray-700 transition-colors hover:text-[#5cb85c]">HOME</a></li>
			<li><a href="/about" class="transition-colors hover:text-[#5cb85c]">ABOUT</a></li>
			<li><a href="/discussion" class="transition-colors hover:text-[#5cb85c]">FORUMS</a></li>
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
		<div class="absolute top-full left-0 right-0 z-50 bg-white shadow-md md:hidden">
			<ul class="flex flex-col px-6 py-2 text-sm font-medium tracking-wide text-gray-500">
				<li class="border-b border-gray-100">
					<a
						href="/"
						onclick={() => (menuOpen = false)}
						class="block py-3 text-gray-700 transition-colors hover:text-[#5cb85c]">HOME</a
					>
				</li>
				<li class="border-b border-gray-100">
					<a
						href="/about"
						onclick={() => (menuOpen = false)}
						class="block py-3 transition-colors hover:text-[#5cb85c]">ABOUT</a
					>
				</li>
				<li>
					<a
						href="/discussion"
						onclick={() => (menuOpen = false)}
						class="block py-3 transition-colors hover:text-[#5cb85c]">FORUMS</a
					>
				</li>
			</ul>
		</div>
	{/if}
</nav>
