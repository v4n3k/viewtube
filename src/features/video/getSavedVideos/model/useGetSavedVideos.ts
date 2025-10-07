import { getSavedVideos } from '@/entities/video/api';
import { PAGINATION_LIMIT } from '@/shared/api';
import { useChannelId } from '@/shared/lib';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetSavedVideos = () => {
	const channelId = useChannelId();

	const query = useInfiniteQuery({
		queryKey: ['savedVideos', channelId, PAGINATION_LIMIT],

		queryFn: ({ pageParam = 1 }) => {
			return getSavedVideos({
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
				?.flatMap(page => page.savedVideos)
				?.map(video => ({
					...video,
					createdAt: new Date(video?.createdAt),
				})),
		}),

		enabled: !!channelId,
	});

	return {
		savedVideos: query.data?.pages,
		...query,
	};
};
