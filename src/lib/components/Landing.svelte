<script>
	import illustration from '$lib/assets/images/environment.png';
</script>

<section class="flex min-h-screen flex-col overflow-y-hidden bg-white font-sans">
	<!-- Hero -->
	<div class="flex flex-1 items-center gap-8 px-10 pb-12">
		<!-- Left Content -->
		<div class="flex flex-1 gap-6">
			<div class="flex flex-col justify-center gap-6">
				<div>
					<h1 class="text-6xl leading-tight font-black text-gray-800">CleanQuest</h1>
					<p class="mt-1 text-2xl font-light text-gray-500">
						Respect the planet like you respect your name.
					</p>
				</div>

				<a
					class="w-fit rounded-full bg-[#5cb85c] px-8 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#4aa04a]"
					href="/about"
				>
					Read More
				</a>

				<!-- Info blocks -->
				<div class="mt-8 flex gap-12">
					<div class="max-w-[200px]">
						<p class="mb-2 font-bold text-gray-800">Our Environment</p>
						<p class="text-xs leading-relaxed text-gray-400">
							We should and use all possible methods to inspire the next generation towards
							achieving a green and sustainable environment.
						</p>
					</div>
					<div class="max-w-[200px]">
						<p class="mb-2 font-bold text-gray-800">Our Story</p>
						<p class="text-xs leading-relaxed text-gray-400">
							Having a tree in living room reminds us of nature, its smells, sights and warmth.
							Trees are in serious trouble. We need to restore, replant and cultivate trees.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Illustration -->
		<div class="relative h-[420px] w-[420px] shrink-0">
			<img src={illustration} alt="illustration" />
		</div>
	</div>
</section>
