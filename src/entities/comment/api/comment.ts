import { api, PaginatedResponse, PaginationParams } from '@/shared/api';
import { Comment } from '../model';

interface GetCommentsParams extends PaginationParams {
	videoId: number;
}

interface GetCommentsResponse extends PaginatedResponse<'comments', Comment> {
	videoId: number;
}

export const getComments = async (params: GetCommentsParams) => {
	const { videoId } = params;

	const response = await api.get<GetCommentsResponse>(`/comments/${videoId}`, {
		params,
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
