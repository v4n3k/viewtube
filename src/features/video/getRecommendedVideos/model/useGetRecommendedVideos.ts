'use client';

import { getRecommendedVideos } from '@/entities/video/api';
import { PaginationLimit } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetRecommendedVideos = (params: PaginationLimit) => {
	const { limit } = params;

	const query = useInfiniteQuery({
		queryKey: ['recommendedVideos', limit],

		queryFn: ({ pageParam = 1 }) => {
			return getRecommendedVideos({ page: pageParam, limit });
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
