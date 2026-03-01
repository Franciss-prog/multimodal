<script>
	import illustration from '$lib/assets/images/environment.png';
</script>

<section class="flex min-h-screen flex-col overflow-y-hidden bg-white font-sans">
	<!-- Hero -->
	<div class="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col items-center gap-8 px-6 py-12 md:flex-row md:gap-12 md:px-10 md:pb-12 lg:gap-16 lg:px-16">
		<!-- Left Content -->
		<div class="flex w-full flex-1 gap-6">
			<div class="flex w-full flex-col justify-center gap-6 lg:gap-8">
				<div>
					<h1 class="text-5xl leading-tight font-black text-gray-800 md:text-6xl lg:text-7xl xl:text-8xl">CleanQuest</h1>
					<p class="mt-1 text-xl font-light text-gray-500 md:text-2xl lg:text-3xl">Respect the planet like you respect your name's.</p>
				</div>

				<button
					class="w-fit rounded-full bg-[#5cb85c] px-8 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#4aa04a] lg:px-10 lg:py-4 lg:text-base"
				>
					Read More
				</button>

				<!-- Info blocks -->
				<div class="mt-4 flex flex-col gap-8 sm:flex-row sm:gap-12 md:mt-8 lg:gap-16">
					<div class="max-w-50 lg:max-w-60">
						<p class="mb-2 font-bold text-gray-800 lg:text-lg">Our Environment</p>
						<p class="text-xs leading-relaxed text-gray-400 lg:text-sm">
							We should and use all possible methods to inspire the next generation towards
							achieving a green and sustainable environment.
						</p>
					</div>
					<div class="max-w-50 lg:max-w-60">
						<p class="mb-2 font-bold text-gray-800 lg:text-lg">Our Story</p>
						<p class="text-xs leading-relaxed text-gray-400 lg:text-sm">
							Having a tree in living room reminds us of nature, its smells, sights and warmth.
							Trees are in serious trouble. We need to restore, replant and cultivate trees.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Illustration -->
		<div class="relative w-full shrink-0 sm:w-80 md:h-105 md:w-105 lg:h-120 lg:w-120 xl:h-140 xl:w-140">
			<img src={illustration} alt="illustration" class="h-auto w-full object-contain" />
		</div>
	</div>
</section>
