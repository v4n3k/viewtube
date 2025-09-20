import type { ChannelAuthor } from '@/entities/user/model';

export interface Channel {
	id: number;
	name: string;
	description: string;
	avatarUrl: string;
	bannerUrl: string;
	subscribersCount: number;
	videosCount: number;
	author: ChannelAuthor;
	isSubscribed: boolean;
	createdAt: Date;
}

export interface Subscription {
	subscriberChannelId: number;
	subscribedToChannelId: number;
	createdAt: Date;
}
