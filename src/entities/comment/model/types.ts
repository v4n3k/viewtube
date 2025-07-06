import { Channel } from '@/entities/channel/model';

export interface Comment {
	id: number;
	videoId: number;
	parentCommentId: number | null;
	text: string;
	createdAt: Date;
	channel: Channel;
}
