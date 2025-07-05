import type { ChannelAuthor } from '@/entities/user/model';

export interface Channel {
	id: number;
	name: string;
	description: string;
	avatarUrl: string;
	author: ChannelAuthor;
}
