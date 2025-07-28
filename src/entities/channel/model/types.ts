import type { ChannelAuthor } from '@/entities/user/model';

export interface Channel {
	id: number;
	name: string;
	description: string;
	avatarUrl: string;
	subscriptionsCount: number;
	author: ChannelAuthor;
	isSubscribed: boolean;
}

export interface Subscription {
	subscriberChannelId: number;
	subscribedToChannelId: number;
	createdAt: Date;
}
