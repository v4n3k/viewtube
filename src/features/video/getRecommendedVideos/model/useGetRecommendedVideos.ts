'use client';

import { getRecommendedVideos } from '@/entities/video/api';
import { PAGINATION_LIMIT } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetRecommendedVideos = () => {
	const query = useInfiniteQuery({
		queryKey: ['recommendedVideos', PAGINATION_LIMIT],

		queryFn: ({ pageParam = 1 }) => {
			return getRecommendedVideos({ page: pageParam, limit: PAGINATION_LIMIT });
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
			pages: data.pages
				?.flatMap(page => page.recommendedVideos)
				?.map(video => ({
					...video,
					createdAt: new Date(video.createdAt),
				})),
		}),
	});

	return {
		recommendedVideos: query.data?.pages,
		...query,
	};
};
