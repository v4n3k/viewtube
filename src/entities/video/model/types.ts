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
	channelId: number;
	channelName: string;
	channelAvatar: string;
	commentsCount?: number;
	isLiked: boolean;
	isDisliked: boolean;
	isSaved: boolean;
	channel: Channel;
}

export type VideoWithoutChannel = Omit<
	Video,
	'channelId' | 'channelName' | 'channelAvatar' | 'channel'
>;

export interface VideoActionParams {
	channelId: number;
	videoId: number;
}

export type VideoAction =
	| 'like'
	| 'dislike'
	| 'unlike'
	| 'undislike'
	| 'watchLater'
	| 'history'
	| 'visibility';

export type VideoActionHandler = (videoId: number) => void;
