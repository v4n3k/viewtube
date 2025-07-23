import { getSavedVideos } from '@/entities/video/api';
import { PaginationLimit } from '@/shared/api';
import { useChannelId } from '@/shared/lib';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetSavedVideos = (params: PaginationLimit) => {
	const channelId = useChannelId();

	const { limit } = params;

	const query = useInfiniteQuery({
		queryKey: ['savedVideos', limit],

		queryFn: ({ pageParam = 1 }) => {
			return getSavedVideos({ channelId, page: pageParam, limit });
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
	});

	return {
		savedVideos: query.data?.pages,
		...query,
	};
};
