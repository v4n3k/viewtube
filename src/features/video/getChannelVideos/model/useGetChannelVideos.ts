import { getChannelVideos } from '@/entities/video/api';
import { VideoWithoutChannel } from '@/entities/video/model';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGINATION_LIMIT } from './../../../../shared/api/api';

interface GetChannelVideosParams {
	channelId: number;
}

export const useGetChannelVideos = (params: GetChannelVideosParams) => {
	const { channelId } = params;

	const query = useInfiniteQuery({
		queryKey: ['channelVideos', channelId, PAGINATION_LIMIT],

		queryFn: ({ pageParam = 1 }) => {
			return getChannelVideos<VideoWithoutChannel>({
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
				?.flatMap(page => page.channelVideos)
				?.map(video => ({
					...video,
					createdAt: new Date(video?.createdAt),
				})),
		}),

		enabled: !!channelId,
	});

	return {
		channelVideos: query.data?.pages,
		...query,
	};
};
