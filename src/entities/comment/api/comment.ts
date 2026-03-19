import { api } from '@/shared/api';
import {
	Comment,
	CreateCommentParams,
	GetCommentsParams,
	GetCommentsResponse,
} from '../model';
import { http } from '@/shared/api/httpClient';

export const getComments = async (params: GetCommentsParams) => {
	const { videoId, ...paginationParams } = params;

	const response = await http.get<GetCommentsResponse>(`/comments/${videoId}`, {
		params: paginationParams,
	});

	return response;
};

export const createComment = async (comment: CreateCommentParams) => {
	const response = await api.post<Comment>('/comments', comment);
	return response.data;
};

export const getRepliesToComment = async (commentId: number) => {
	const response = await http.get<Comment[]>(`/comments/${commentId}/replies`);
	return response;
};
