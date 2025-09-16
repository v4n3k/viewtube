'use client';

import { getChannelVideos } from '@/entities/video/api';
import { Video } from '@/entities/video/model';
import { PaginationLimit } from '@/shared/api';
import { useChannelId } from '@/shared/lib';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMyVideos = (params: PaginationLimit) => {
	const channelId = useChannelId();

	const { limit } = params;

	const query = useInfiniteQuery({
		queryKey: ['myVideos', limit],

		queryFn: ({ pageParam = 1 }) => {
			return getChannelVideos<Video>({ channelId, page: pageParam, limit });
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
				?.flatMap(page => page.channelVideos)
				?.map(video => ({
					...video,
					createdAt: new Date(video.createdAt),
				})),
		}),

		enabled: !!channelId,
	});

	return {
		myVideos: query.data?.pages,
		...query,
	};
};
