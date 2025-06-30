import { api } from '@/shared/api';
import { Video } from '../model';

interface GetVideosParams {
	page: number;
	limit: number;
}

interface GetRecommendedVideosResponse {
	recommendedVideos: Video[];
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

export const getRecommendedVideos = async (params: GetVideosParams) => {
	const { page, limit } = params;

	const response = await api.get<GetRecommendedVideosResponse>('/videos', {
		params: {
			page,
			limit,
		},
	});

	const recommendedVideos: Video[] = response.data.recommendedVideos.map(
		video => ({
			...video,
			createdAt: new Date(video.createdAt),
		})
	);

	return {
		recommendedVideos,
		currentPage: response.data.currentPage,
		totalPages: response.data.totalPages,
	};
};
