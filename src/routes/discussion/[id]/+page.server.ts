import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabase';
import { error, fail } from '@sveltejs/kit';
import type { Discussion, Reply } from '$lib/stores/discussions.svelte';

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const [discussionRes, repliesRes] = await Promise.all([
		supabase
			.from('discussions')
			.select('id, title, body, author, category, created_at, closed')
			.eq('id', id)
			.single(),
		supabase
			.from('replies')
			.select('id, discussion_id, author, body, created_at')
			.eq('discussion_id', id)
			.order('created_at', { ascending: true })
	]);

	if (discussionRes.error || !discussionRes.data) {
		throw error(404, 'Discussion not found');
	}

	return {
		discussion: discussionRes.data as Discussion,
		replies: (repliesRes.data ?? []) as Reply[]
	};
};

export const actions: Actions = {
	reply: async ({ request, params }: { request: Request; params: { id: string } }) => {
		const { id } = params;
		const data = await request.formData();

		const author = (data.get('author') as string)?.trim();
		const body = (data.get('body') as string)?.trim();

		if (!author) return fail(400, { replyError: 'Please enter your name.' });
		if (!body) return fail(400, { replyError: 'Please write a reply.' });

		const { error: dbError } = await supabase
			.from('replies')
			.insert({ discussion_id: id, author, body });

		if (dbError) return fail(500, { replyError: 'Failed to post reply. Please try again.' });

		return { replySuccess: true };
	},

	toggleClose: async ({ params }: { params: { id: string } }) => {
		const { id } = params;

		const { data: discussion } = await supabase
			.from('discussions')
			.select('closed')
			.eq('id', id)
			.single();

		const current = discussion as { closed: boolean } | null;
		if (!current) return fail(404, { error: 'Discussion not found.' });

		const { error: dbError } = await supabase
			.from('discussions')
			.update({ closed: !current.closed })
			.eq('id', id);

		if (dbError) return fail(500, { error: 'Failed to update discussion status.' });

		return { closed: !current.closed };
	}
};
