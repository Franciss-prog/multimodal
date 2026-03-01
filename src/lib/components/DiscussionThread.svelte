<script lang="ts">
	import { goto } from '$app/navigation';
	import { discussions, categoryConfig, timeAgo } from '$lib/stores/discussions.svelte';

	let { id }: { id: string } = $props();

	let discussion = $derived(discussions.getById(id));

	let replyForm = $state({ author: '', body: '' });
	let replyError = $state('');
	let submitting = $state(false);

	function submitReply() {
		if (!replyForm.author.trim()) { replyError = 'Please enter your name.'; return; }
		if (!replyForm.body.trim()) { replyError = 'Please write a reply.'; return; }
		discussions.addReply(id, { author: replyForm.author.trim(), body: replyForm.body.trim() });
		replyForm = { author: '', body: '' };
		replyError = '';
	}

	function toggleClose() {
		if (!discussion) return;
		if (discussion.closed) discussions.reopen(id);
		else discussions.close(id);
	}
</script>

{#if !discussion}
	<div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
		<p class="text-lg font-semibold text-gray-600">Discussion not found.</p>
		<button onclick={() => goto('/discussion')} class="mt-4 text-sm text-[#5cb85c] hover:underline">
			← Back to Forums
		</button>
	</div>
{:else}
	<div class="mx-auto w-full max-w-3xl px-6 py-10 md:px-10">
		<!-- Back button -->
		<button
			onclick={() => goto('/discussion')}
			class="mb-6 flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-[#5cb85c]"
		>
			← Back to Forums
		</button>

		<!-- Thread Header -->
		<div class="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
				<div class="flex items-center gap-2">
					<span
						class="rounded-full px-3 py-1 text-xs font-semibold {categoryConfig[discussion.category].badge}"
					>
						{categoryConfig[discussion.category].label}
					</span>
					{#if discussion.closed}
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
				<!-- Close / Reopen button -->
				<button
					onclick={toggleClose}
					class="rounded-full border px-4 py-1.5 text-xs font-medium transition-colors
						{discussion.closed
						? 'border-[#7dd96a] text-[#5cb85c] hover:bg-green-50'
						: 'border-red-200 text-red-400 hover:bg-red-50'}"
				>
					{discussion.closed ? '🔓 Reopen Discussion' : '🔒 Close Discussion'}
				</button>
			</div>

			<h1 class="mb-4 text-2xl font-black text-gray-800 md:text-3xl">{discussion.title}</h1>

			<!-- Original post -->
			<div class="flex gap-3">
				<div
					class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] text-sm font-bold text-[#5cb85c]"
				>
					{discussion.author[0].toUpperCase()}
				</div>
				<div class="flex-1">
					<div class="mb-1 flex items-center gap-2 text-xs text-gray-400">
						<span class="font-semibold text-gray-700">{discussion.author}</span>
						<span>·</span>
						<span>{timeAgo(discussion.createdAt)}</span>
					</div>
					<p class="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{discussion.body}</p>
				</div>
			</div>
		</div>

		<!-- Replies -->
		{#if discussion.replies.length > 0}
			<div class="mb-6">
				<h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
					{discussion.replies.length} {discussion.replies.length === 1 ? 'Reply' : 'Replies'}
				</h2>
				<div class="flex flex-col gap-3">
					{#each discussion.replies as reply (reply.id)}
						<div class="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
							<div
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500"
							>
								{reply.author[0].toUpperCase()}
							</div>
							<div class="flex-1">
								<div class="mb-1 flex items-center gap-2 text-xs text-gray-400">
									<span class="font-semibold text-gray-700">{reply.author}</span>
									<span>·</span>
									<span>{timeAgo(reply.createdAt)}</span>
								</div>
								<p class="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{reply.body}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Reply form -->
		{#if discussion.closed}
			<div class="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center text-sm text-gray-400">
				🔒 This discussion is closed. No new replies can be posted.
			</div>
		{:else}
			<div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
				<h2 class="mb-4 text-sm font-bold text-gray-700">Leave a Reply</h2>
				<div class="flex flex-col gap-3">
					<input
						type="text"
						bind:value={replyForm.author}
						placeholder="Your name"
						class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#7dd96a] focus:ring-1 focus:ring-[#7dd96a]"
					/>
					<textarea
						bind:value={replyForm.body}
						placeholder="Write your reply..."
						rows="3"
						class="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#7dd96a] focus:ring-1 focus:ring-[#7dd96a]"
					></textarea>

					{#if replyError}
						<p class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-500">{replyError}</p>
					{/if}

					<button
						onclick={submitReply}
						disabled={submitting}
						class="self-end rounded-full bg-[#5cb85c] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4aa04a] disabled:opacity-50"
					>
						Post Reply
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}
