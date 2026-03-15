import {
	getRecommendedVideos,
	GetRecommendedVideosResponse,
} from '@/entities/video/api';
import { PAGINATION_LIMIT } from '@/shared/api';
import { QueryClient } from '@tanstack/react-query';
import { RECOMMENDED_VIDEOS_KEY } from './queryKey';

export const prefetchRecommendedVideos = async (queryClient: QueryClient) => {
	await queryClient.prefetchInfiniteQuery({
		queryKey: RECOMMENDED_VIDEOS_KEY,

		queryFn: ({ pageParam = 1 }) => {
			return getRecommendedVideos({ page: pageParam, limit: PAGINATION_LIMIT });
		},

		getNextPageParam: (lastPage: GetRecommendedVideosResponse) => {
			if (lastPage.currentPage < lastPage.totalPages) {
				return lastPage.currentPage + 1;
			}
			return undefined;
		},

		initialPageParam: 1,
	});
};
