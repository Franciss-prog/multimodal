import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabase';
import { fail } from '@sveltejs/kit';
import type { Category } from '$lib/stores/discussions.svelte';

type DiscussionRow = {
	id: string;
	title: string;
	body: string;
	author: string;
	category: Category;
	created_at: string;
	closed: boolean;
	replyCount: number;
};

export const load: PageServerLoad = async () => {
	const { data: discussions, error } = await supabase
		.from('discussions')
		.select('id, title, body, author, category, created_at, closed')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Failed to load discussions:', error.message);
		return { discussions: [] as DiscussionRow[] };
	}

	// Fetch reply counts for all discussions in one query
	const { data: replyCounts } = await supabase
		.from('replies')
		.select('discussion_id');

	const countMap: Record<string, number> = {};
	for (const row of (replyCounts ?? []) as { discussion_id: string }[]) {
		countMap[row.discussion_id] = (countMap[row.discussion_id] ?? 0) + 1;
	}

	return {
		discussions: ((discussions ?? []) as Omit<DiscussionRow, 'replyCount'>[]).map((d) => ({
			...d,
			replyCount: countMap[d.id] ?? 0
		})) as DiscussionRow[]
	};
};

export const actions: Actions = {
	create: async ({ request }: { request: Request }) => {
		const data = await request.formData();

		const title = (data.get('title') as string)?.trim();
		const body = (data.get('body') as string)?.trim();
		const author = (data.get('author') as string)?.trim();
		const category = (data.get('category') as string)?.trim();

		if (!title) return fail(400, { error: 'Please enter a title.' });
		if (!body) return fail(400, { error: 'Please describe your discussion.' });
		if (!author) return fail(400, { error: 'Please enter your name.' });
		if (!['air', 'water', 'land', 'general'].includes(category))
			return fail(400, { error: 'Invalid category.' });

		const { error: dbError } = await supabase
			.from('discussions')
			.insert({ title, body, author, category });

		if (dbError) return fail(500, { error: 'Failed to post discussion. Please try again.' });

		return { success: true };
	}
};
