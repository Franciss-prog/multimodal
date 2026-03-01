<script>
	import water1 from '$lib/assets/images/WaterPollution1.jpg';
	import water2 from '$lib/assets/images/WaterPollution2.jpg';
	import water3 from '$lib/assets/images/WaterPollution3.jpg';
	import air1 from '$lib/assets/images/AirPollution1.jpg';
	import air2 from '$lib/assets/images/AirPollution2.jpg';
	import air3 from '$lib/assets/images/AirPollution3.jpg';
	import land1 from '$lib/assets/images/LandPollution1.jpg';
	import land2 from '$lib/assets/images/LandPollution2.jpg';
	import land3 from '$lib/assets/images/LandPollution3.jpg';

	const pollutions = [
		{
			id: 'water',
			label: 'Water Pollution',
			color: '#3b82f6',
			bg: '#eff6ff',
			border: '#bfdbfe',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6 8 4 12 4 14a8 8 0 0 0 16 0c0-2-2-6-8-12z"/></svg>`,
			description:
				'Water pollution happens when harmful substances like plastic, chemicals, oil, and waste enter rivers, lakes, and oceans. These pollutants make the water dirty and unsafe for people, animals, and plants. Water pollution can harm marine life, spread diseases, and damage ecosystems. It is often caused by improper waste disposal, industrial discharge, sewage, and agricultural runoff.',
			effects: [
				{
					label: 'Contaminates drinking water',
					detail: 'causes diseases like diarrhea and cholera'
				},
				{ label: 'Harms aquatic life', detail: 'fish and plants die' },
				{ label: 'Destroys ecosystems', detail: 'affects food chains and biodiversity' },
				{ label: 'Reduces safe water', detail: 'for farming and recreation' }
			],
			images: [water1, water2, water3]
		},
		{
			id: 'air',
			label: 'Air Pollution',
			color: '#64748b',
			bg: '#f8fafc',
			border: '#cbd5e1',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
			description:
				'Air pollution happens when harmful gases, smoke, dust, and chemicals mix into the air we breathe. It is commonly caused by vehicle emissions, factory smoke, burning trash, and the use of fossil fuels. Air pollution can lead to health problems like coughing, asthma, and other respiratory diseases, and it also contributes to climate change.',
			effects: [
				{ label: 'Causes respiratory problems', detail: 'asthma, coughing, lung diseases' },
				{ label: 'Contributes to climate change', detail: 'global warming, heat waves' },
				{ label: 'Harms animals and plants', detail: 'weakens forests and crops' },
				{ label: 'Reduces air quality', detail: 'visibility problems and smog' }
			],
			images: [air1, air2, air3]
		},
		{
			id: 'land',
			label: 'Land Pollution',
			color: '#a16207',
			bg: '#fefce8',
			border: '#fde68a',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
			description:
				'Land pollution occurs when waste materials such as plastic, garbage, chemicals, and industrial waste are improperly disposed of on the ground. It is often caused by littering, poor waste management, and illegal dumping. Land pollution damages soil quality, harms animals, and can contaminate water sources, affecting both the environment and human health.',
			effects: [
				{ label: 'Damages soil quality', detail: 'crops grow poorly or become toxic' },
				{ label: 'Kills or harms animals', detail: 'ingesting plastics or chemicals' },
				{ label: 'Pollutes groundwater', detail: 'affects drinking water sources' },
				{ label: 'Creates unsightly environments', detail: 'contributes to disease spread' }
			],
			images: [land1, land2, land3]
		}
	];

	let activeTab = 'water';
	$: active = pollutions.find((p) => p.id === activeTab);
</script>

<section class="min-h-screen bg-white font-sans">
	<!-- Page Header -->
	<div class="border-b border-gray-100 bg-white px-6 py-10 text-center md:py-14">
		<p class="mb-2 text-xs font-semibold tracking-widest text-[#5cb85c] uppercase">CleanQuest</p>
		<h1 class="text-4xl font-black text-gray-800 md:text-5xl">About Pollution</h1>
		<p class="mx-auto mt-3 max-w-xl text-base text-gray-400">
			Understanding the three major types of environmental pollution — their causes and the damage
			they cause to our world.
		</p>
	</div>

	<!-- Tab Bar -->
	<div class="sticky top-0 z-10 border-b border-gray-100 bg-white px-4">
		<div class="mx-auto flex max-w-4xl gap-1 overflow-x-auto py-3">
			{#each pollutions as p}
				<button
					on:click={() => (activeTab = p.id)}
					class="flex shrink-0 items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all"
					style={activeTab === p.id
						? `background:${p.bg}; color:${p.color}; outline: 1.5px solid ${p.border};`
						: 'color:#9ca3af;'}
				>
					<span class="h-4 w-4" style="color:{p.color}">{@html p.icon}</span>
					{p.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- Content -->
	{#if active}
		<div class="mx-auto max-w-4xl px-6 py-10 md:py-14">
			<!-- Title + Description -->
			<div class="mb-8 flex items-start gap-4">
				<div
					class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
					style="background:{active.bg}; color:{active.color}"
				>
					<span class="h-5 w-5">{@html active.icon}</span>
				</div>
				<div>
					<h2 class="text-2xl font-black text-gray-800 md:text-3xl">{active.label}</h2>
					<p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
						{active.description}
					</p>
				</div>
			</div>

			<!-- Bad Effects -->
			<div class="mb-10">
				<h3 class="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
					Bad Effects
				</h3>
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{#each active.effects as effect}
						<div
							class="flex items-start gap-3 rounded-xl border p-4"
							style="background:{active.bg}; border-color:{active.border}"
						>
							<span class="mt-0.5 h-2 w-2 shrink-0 rounded-full" style="background:{active.color}"
							></span>
							<div>
								<p class="text-sm font-semibold text-gray-700">{effect.label}</p>
								<p class="text-xs text-gray-400">{effect.detail}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Image Gallery -->
			<div>
				<h3 class="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">Gallery</h3>
				<div class="grid grid-cols-3 gap-3">
					{#each active.images as img, i}
						<div
							class="aspect-video w-full overflow-hidden rounded-xl border"
							style="background:{active.bg}; border-color:{active.border}"
						>
							{#if img}
								<img src={img} alt="{active.label} {i + 1}" class="h-full w-full object-cover" />
							{:else}
								<!-- Placeholder — replace by passing real src values into images[] above -->
								<div class="flex h-full flex-col items-center justify-center gap-1 opacity-30">
									<span class="h-6 w-6" style="color:{active.color}">{@html active.icon}</span>
									<span class="text-xs text-gray-400">Photo {i + 1}</span>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</section>
