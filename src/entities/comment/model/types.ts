import { Channel } from '@/entities/channel/model';

export interface Comment {
	id: number;
	videoId: number;
	text: string;
	createdAt: Date;
	channel: Channel;
}
