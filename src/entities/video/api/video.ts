import { api } from '@/shared/api';
import { Video } from '../model';

interface GetVideosParams {
	page?: number; // Делаем их опциональными, если у вас есть дефолты на бэкенде
	limit?: number;
}

export const getRecommendedVideos = async (params: GetVideosParams = {}) => {
	const { page = 1, limit = 10 } = params;

	return await api.get<Video[]>('/videos', {
		params: {
			page,
			limit,
		},
	});
};
