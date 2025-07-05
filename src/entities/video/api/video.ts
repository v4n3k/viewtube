import { api } from '@/shared/api';
import { Video } from '../model';

interface GetRecommendedVideosParams {
	page: number;
	limit: number;
}

interface GetRecommendedVideosResponse {
	recommendedVideos: Video[];
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

export const getRecommendedVideos = async (
	params: GetRecommendedVideosParams
) => {
	const response = await api.get<GetRecommendedVideosResponse>('/videos', {
		params,
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
