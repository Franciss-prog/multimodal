<script lang="ts">
import { goto } from '$app/navigation';
import { enhance } from '$app/forms';
import { categoryConfig, timeAgo, type Category, type Discussion } from '$lib/stores/discussions.svelte';

type FilterCategory = 'all' | Category;

interface DiscussionWithCount extends Discussion {
replyCount: number;
}

let {
discussions,
form
}: {
discussions: DiscussionWithCount[];
form: { error?: string; success?: boolean } | null;
} = $props();

let activeFilter = $state<FilterCategory>('all');
let showModal = $state(false);
let submitting = $state(false);

let filtered = $derived(
activeFilter === 'all'
? discussions
: discussions.filter((d) => d.category === activeFilter)
);

let counts = $derived({
all: discussions.length,
air: discussions.filter((d) => d.category === 'air').length,
water: discussions.filter((d) => d.category === 'water').length,
land: discussions.filter((d) => d.category === 'land').length,
general: discussions.filter((d) => d.category === 'general').length
});

function openModal() {
showModal = true;
}

function closeModal() {
showModal = false;
}

$effect(() => {
if (form?.success) {
showModal = false;
}
});

const filterTabs: { key: FilterCategory; label: string }[] = [
{ key: 'all', label: 'All Topics' },
{ key: 'air', label: 'Air Pollution' },
{ key: 'water', label: 'Water Pollution' },
{ key: 'land', label: 'Land Pollution' },
{ key: 'general', label: 'General' }
];

const filterColors: Record<FilterCategory, { active: string; inactive: string }> = {
all: { active: 'bg-[#5cb85c] text-white', inactive: 'text-gray-500 hover:text-gray-700' },
air: { active: 'bg-sky-500 text-white', inactive: 'text-gray-500 hover:text-sky-600' },
water: { active: 'bg-cyan-500 text-white', inactive: 'text-gray-500 hover:text-cyan-600' },
land: { active: 'bg-green-500 text-white', inactive: 'text-gray-500 hover:text-green-600' },
general: { active: 'bg-gray-500 text-white', inactive: 'text-gray-500 hover:text-gray-700' }
};
</script>

<div class="mx-auto min-h-screen w-full max-w-screen-2xl px-6 py-10 md:px-10 lg:px-16">
<!-- Header -->
<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<div>
<h1 class="text-3xl font-black text-gray-800 lg:text-4xl">Community Forums</h1>
<p class="mt-1 text-sm text-gray-400">
Open discussions on pollution and environmental issues
</p>
</div>
<button
onclick={openModal}
class="flex w-fit items-center gap-2 rounded-full bg-[#5cb85c] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4aa04a]"
>
<span class="text-lg leading-none">+</span>
New Discussion
</button>
</div>

<!-- Filter Tabs -->
<div class="mb-6 flex flex-wrap gap-2">
{#each filterTabs as tab}
<button
onclick={() => (activeFilter = tab.key)}
class="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all
{activeFilter === tab.key
? filterColors[tab.key].active + ' shadow-sm'
: filterColors[tab.key].inactive + ' bg-gray-50'}"
>
{tab.label}
<span
class="rounded-full px-1.5 py-0.5 text-xs
{activeFilter === tab.key ? 'bg-white/25' : 'bg-gray-200 text-gray-500'}"
>
{counts[tab.key]}
</span>
</button>
{/each}
</div>

<!-- Discussion List -->
{#if filtered.length === 0}
<div class="flex flex-col items-center justify-center py-24 text-center">
<div class="mb-4 text-6xl"></div>
<p class="text-lg font-semibold text-gray-700">No discussions yet</p>
<p class="mt-1 text-sm text-gray-400">Be the first to start a conversation in this topic.</p>
<button
onclick={openModal}
class="mt-6 rounded-full bg-[#5cb85c] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4aa04a]"
>
Start a Discussion
</button>
</div>
{:else}
<div class="flex flex-col gap-3">
{#each filtered as d (d.id)}
<button
onclick={() => goto(`/discussion/${d.id}`)}
class="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:border-[#7dd96a] hover:shadow-md"
>
<!-- Top row: badge + status -->
<div class="flex items-center justify-between gap-2">
<span
class="rounded-full px-3 py-1 text-xs font-semibold {categoryConfig[d.category].badge}"
>
{categoryConfig[d.category].label}
</span>
{#if d.closed}
<span
class="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-500"
>
<span class="h-1.5 w-1.5 rounded-full bg-red-400"></span>
Closed
</span>
{:else}
<span
class="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600"
>
<span class="h-1.5 w-1.5 rounded-full bg-green-400"></span>
Open
</span>
{/if}
</div>

<!-- Title -->
<h2
class="text-base font-bold text-gray-800 transition-colors group-hover:text-[#5cb85c] md:text-lg"
>
{d.title}
</h2>

<!-- Body excerpt -->
<p class="line-clamp-2 text-sm leading-relaxed text-gray-400">
{d.body}
</p>

<!-- Footer row -->
<div class="flex items-center gap-3 text-xs text-gray-400">
<span
class="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f5e9] text-xs font-bold text-[#5cb85c]"
>
{d.author[0].toUpperCase()}
</span>
<span class="font-medium text-gray-600">{d.author}</span>
<span></span>
<span>{timeAgo(d.created_at)}</span>
<span></span>
<span> {d.replyCount} {d.replyCount === 1 ? 'reply' : 'replies'}</span>
</div>
</button>
{/each}
</div>
{/if}
</div>

<!-- New Discussion Modal -->
{#if showModal}
<div
class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
onclick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
role="presentation"
>
<div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
<div class="mb-5 flex items-center justify-between">
<h2 class="text-xl font-black text-gray-800">New Discussion</h2>
<button
onclick={closeModal}
aria-label="Close modal"
class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
>
✕
</button>
</div>

<form
method="POST"
action="?/create"
use:enhance={() => {
submitting = true;
return async ({ update }) => {
await update();
submitting = false;
};
}}
class="flex flex-col gap-4"
>
<!-- Name -->
<div>
<label class="mb-1 block text-xs font-semibold text-gray-600" for="author">Your Name</label>
<input
id="author"
name="author"
type="text"
placeholder="e.g. EcoWarrior"
class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#7dd96a] focus:ring-1 focus:ring-[#7dd96a]"
/>
</div>

<!-- Category -->
<div>
<label class="mb-1 block text-xs font-semibold text-gray-600" for="category">Category</label>
<select
id="category"
name="category"
class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#7dd96a] focus:ring-1 focus:ring-[#7dd96a]"
>
<option value="air">Air Pollution</option>
<option value="water">Water Pollution</option>
<option value="land">Land Pollution</option>
<option value="general">General</option>
</select>
</div>

<!-- Title -->
<div>
<label class="mb-1 block text-xs font-semibold text-gray-600" for="title">Title</label>
<input
id="title"
name="title"
type="text"
placeholder="What would you like to discuss?"
class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#7dd96a] focus:ring-1 focus:ring-[#7dd96a]"
/>
</div>

<!-- Body -->
<div>
<label class="mb-1 block text-xs font-semibold text-gray-600" for="body">Description</label>
<textarea
id="body"
name="body"
placeholder="Share the details of your discussion..."
rows="4"
class="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#7dd96a] focus:ring-1 focus:ring-[#7dd96a]"
></textarea>
</div>

{#if form?.error}
<p class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-500">{form.error}</p>
{/if}

<div class="flex gap-3 pt-1">
<button
type="button"
onclick={closeModal}
class="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50"
>
Cancel
</button>
<button
type="submit"
disabled={submitting}
class="flex-1 rounded-xl bg-[#5cb85c] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4aa04a] disabled:opacity-50"
>
{submitting ? 'Posting...' : 'Post Discussion'}
</button>
</div>
</form>
</div>
</div>
{/if}
