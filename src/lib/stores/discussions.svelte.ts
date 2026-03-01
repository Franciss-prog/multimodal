export type Category = 'air' | 'water' | 'land' | 'general';

export interface Reply {
	id: string;
	author: string;
	body: string;
	createdAt: string;
}

export interface Discussion {
	id: string;
	title: string;
	body: string;
	author: string;
	category: Category;
	createdAt: string;
	closed: boolean;
	replies: Reply[];
}

export const categoryConfig: Record<Category, { label: string; badge: string; tab: string }> = {
	air: {
		label: 'Air Pollution',
		badge: 'bg-sky-100 text-sky-700',
		tab: 'bg-sky-500 text-white'
	},
	water: {
		label: 'Water Pollution',
		badge: 'bg-cyan-100 text-cyan-700',
		tab: 'bg-cyan-500 text-white'
	},
	land: {
		label: 'Land Pollution',
		badge: 'bg-green-100 text-green-700',
		tab: 'bg-green-500 text-white'
	},
	general: {
		label: 'General',
		badge: 'bg-gray-100 text-gray-600',
		tab: 'bg-gray-500 text-white'
	}
};

export function timeAgo(isoString: string): string {
	const diff = Date.now() - new Date(isoString).getTime();
	const minutes = Math.floor(diff / 60000);
	if (minutes < 1) return 'just now';
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days < 30) return `${days}d ago`;
	return new Date(isoString).toLocaleDateString();
}

const SEED: Discussion[] = [
	{
		id: 'seed-1',
		title: 'How can we reduce vehicle exhaust emissions in our city?',
		body: 'Air quality in urban areas has been deteriorating rapidly due to vehicle exhaust. I\'ve noticed a significant increase in smog over the past few years. What practical steps can local communities and governments take to tackle this? Carpooling incentives? EV subsidies? Stricter emission standards?',
		author: 'AirWatch',
		category: 'air',
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
		closed: false,
		replies: [
			{
				id: 'r1',
				author: 'GreenCommuter',
				body: 'Expanding public transport is key. If people have reliable buses and trains, fewer cars hit the road.',
				createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
			},
			{
				id: 'r2',
				author: 'UrbanPlanner99',
				body: 'Bike lanes and pedestrian zones in city centers have worked wonders in European cities. We should push for that here.',
				createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
			}
		]
	},
	{
		id: 'seed-2',
		title: 'Plastic waste washing up on local beaches — what are we doing about it?',
		body: 'Last weekend I joined a beach cleanup and we collected over 200kg of plastic in just 4 hours. Single-use plastics are the biggest offender. Is a complete ban the answer or do we need smarter waste management systems?',
		author: 'OceanGuardian',
		category: 'water',
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
		closed: false,
		replies: [
			{
				id: 'r3',
				author: 'MarineBiologist',
				body: 'The microplastic problem is even more alarming — it enters the food chain and ends up in human bodies. We need aggressive policy change.',
				createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
			}
		]
	},
	{
		id: 'seed-3',
		title: 'Illegal dumping sites are destroying our forests',
		body: 'There are at least three illegal dump sites within 10km of our town. Chemicals are leaching into the soil and killing wildlife. Local authorities seem unresponsive. Has anyone successfully pushed for cleanup in their area?',
		author: 'ForestKeeper',
		category: 'land',
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
		closed: false,
		replies: [
			{
				id: 'r4',
				author: 'EnviroLawyer',
				body: 'Document everything with photos and GPS coordinates. File a formal complaint with the environmental protection agency — they are legally obligated to investigate.',
				createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
			},
			{
				id: 'r5',
				author: 'CommunityOrg',
				body: 'We organized a public petition that got 2,000 signatures and the local council finally acted. Community pressure works!',
				createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString()
			},
			{
				id: 'r6',
				author: 'ForestKeeper',
				body: 'Thank you both — I\'ll start documenting and drafting a petition this week.',
				createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
			}
		]
	},
	{
		id: 'seed-4',
		title: 'Introducing ourselves — why do you care about the environment?',
		body: 'I thought it would be nice to have a thread where we share our personal stories. What got you passionate about environmental issues? For me it was watching a coral reef bleach on a diving trip 5 years ago. It changed my life.',
		author: 'EcoStarter',
		category: 'general',
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
		closed: false,
		replies: [
			{
				id: 'r7',
				author: 'TreePlanter',
				body: 'Growing up near a factory that polluted the river near my village. I never want another child to grow up like that.',
				createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString()
			}
		]
	},
	{
		id: 'seed-5',
		title: 'Industrial factory discharging into the river upstream',
		body: 'We have documented evidence of a chemical plant releasing untreated wastewater into the river every night. The water has turned a brownish color and fish are dying. This has been going on for months.',
		author: 'RiverWatch',
		category: 'water',
		createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
		closed: true,
		replies: [
			{
				id: 'r8',
				author: 'Investigator',
				body: 'Report this to the EPA and also contact local journalists. Media attention accelerates government response dramatically.',
				createdAt: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString()
			}
		]
	}
];

function loadFromStorage(): Discussion[] {
	if (typeof localStorage === 'undefined') return SEED;
	const raw = localStorage.getItem('forum_discussions');
	return raw ? JSON.parse(raw) : SEED;
}

function saveToStorage(data: Discussion[]) {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem('forum_discussions', JSON.stringify(data));
}

class DiscussionsStore {
	items = $state<Discussion[]>(loadFromStorage());

	add(d: Omit<Discussion, 'id' | 'createdAt' | 'closed' | 'replies'>) {
		const item: Discussion = {
			...d,
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			closed: false,
			replies: []
		};
		this.items = [item, ...this.items];
		saveToStorage(this.items);
	}

	addReply(discussionId: string, reply: { author: string; body: string }) {
		this.items = this.items.map((d) =>
			d.id === discussionId
				? {
						...d,
						replies: [
							...d.replies,
							{ ...reply, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
						]
					}
				: d
		);
		saveToStorage(this.items);
	}

	close(id: string) {
		this.items = this.items.map((d) => (d.id === id ? { ...d, closed: true } : d));
		saveToStorage(this.items);
	}

	reopen(id: string) {
		this.items = this.items.map((d) => (d.id === id ? { ...d, closed: false } : d));
		saveToStorage(this.items);
	}

	getById(id: string): Discussion | undefined {
		return this.items.find((d) => d.id === id);
	}
}

export const discussions = new DiscussionsStore();
