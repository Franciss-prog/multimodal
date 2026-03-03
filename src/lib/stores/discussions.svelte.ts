export type Category = 'air' | 'water' | 'land' | 'general';

export interface Reply {
id: string;
discussion_id: string;
author: string;
body: string;
created_at: string;
}

export interface Discussion {
id: string;
title: string;
body: string;
author: string;
category: Category;
created_at: string;
closed: boolean;
replies?: Reply[];
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
