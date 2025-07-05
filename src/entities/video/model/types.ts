import type { Channel } from '@/entities/channel/model';

type Visibility = 'public' | 'private';

export interface Video {
	id: number;
	userId: number;
	category: string;
	title: string;
	description: string;
	previewUrl: string;
	videoUrl: string;
	views: number;
	duration: number;
	visibility: Visibility;
	allowComments: boolean;
	createdAt: Date;
	updatedAt: Date;
	channelId: number;
	channelName: string;
	channelAvatar: string;
	channel: Channel;
}
