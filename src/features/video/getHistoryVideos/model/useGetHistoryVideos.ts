import { getHistoryVideos } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGINATION_LIMIT } from './../../../../shared/api/api';

export const useGetHistoryVideos = () => {
	const channelId = useChannelId();

	const query = useInfiniteQuery({
		queryKey: ['historyVideos', channelId, PAGINATION_LIMIT],

		queryFn: ({ pageParam = 1 }) => {
			return getHistoryVideos({
				channelId,
				page: pageParam,
				limit: PAGINATION_LIMIT,
			});
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
				?.flatMap(page => page.historyVideos)
				?.map(video => ({
					...video,
					createdAt: new Date(video?.createdAt),
				})),
		}),

		enabled: !!channelId,
	});

	return {
		historyVideos: query.data?.pages,
		...query,
	};
};
