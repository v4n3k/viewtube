import { Channel } from '@/entities/channel/model';
import { PaginatedResponse, PaginationParams } from '@/shared/api';

export interface Comment {
	id: number;
	videoId: number;
	parentCommentId: number | null;
	text: string;
	repliesCount: number;
	createdAt: Date;
	channel: Channel;
}

export interface Reply
	extends Omit<Comment, 'parentCommentId' | 'repliesCount'> {}


export	interface GetCommentsParams extends PaginationParams {
	videoId: number;
}

export interface GetCommentsResponse extends PaginatedResponse<'comments', Comment> {
	videoId: number;
}

export interface CreateCommentParams
	extends Pick<Comment, 'videoId' | 'parentCommentId' | 'text'> {
	channelId: number;
}