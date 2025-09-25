'use client';

import { getSubscriptionVideos } from '@/entities/video/api';
import { PaginationLimit } from '@/shared/api';
import { useChannelId } from '@/shared/lib';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetSubscriptionVideos = (params: PaginationLimit) => {
	const channelId = useChannelId();

	const { limit } = params;

	const query = useInfiniteQuery({
		queryKey: ['subscriptionVideos', channelId, limit],

		queryFn: ({ pageParam = 1 }) => {
			return getSubscriptionVideos({ channelId, page: pageParam, limit });
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
				?.flatMap(page => page.subscriptionVideos)
				?.map(video => ({
					...video,
					createdAt: new Date(video.createdAt),
				})),
		}),

		enabled: !!channelId,
	});

	return {
		subscriptionVideos: query.data?.pages,
		...query,
	};
};
