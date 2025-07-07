import { api } from '@/shared/api';
import {
	Comment,
	CreateCommentParams,
	GetCommentsParams,
	GetCommentsResponse,
} from '../model';

export const getComments = async (params: GetCommentsParams) => {
	const { videoId, ...paginationParams } = params;

	const response = await api.get<GetCommentsResponse>(`/comments/${videoId}`, {
		params: paginationParams,
	});

	const comments: Comment[] = response.data.comments.map(comment => ({
		...comment,
		createdAt: new Date(comment.createdAt),
	}));

	return {
		comments,
		currentPage: response.data.currentPage,
		totalPages: response.data.totalPages,
	};
};

export const createComment = async (comment: CreateCommentParams) => {
	return await api.post<Comment>('/comments', comment);
};

export const getRepliesToComment = async (commentId: number) => {
	return await api.get<Comment[]>(`/comments/${commentId}/replies`);
};
