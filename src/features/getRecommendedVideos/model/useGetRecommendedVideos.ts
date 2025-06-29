import { getRecommendedVideos } from '@/entities/video/api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseRecommendedVideosOptions {
	limit: number;
}

export const useGetRecommendedVideos = (
	options: UseRecommendedVideosOptions
) => {
	const { limit } = options;

	const query = useInfiniteQuery({
		queryKey: ['recommendedVideos', limit],
		queryFn: async ({ pageParam = 1 }) => {
			return await getRecommendedVideos({ page: pageParam, limit });
		},

		getNextPageParam: lastPage => {
			if (lastPage.currentPage < lastPage.totalPages) {
				return lastPage.currentPage + 1;
			}
			return undefined;
		},

		initialPageParam: 1,

		select: data => ({
			...data,
			pages: data.pages.flatMap(page => page.recommendedVideos),
		}),
	});

	return {
		recommendedVideos: query.data?.pages,
		...query,
	};
};
