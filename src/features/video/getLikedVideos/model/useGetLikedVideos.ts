import { getLikedVideos } from '@/entities/video/api';
import { PaginationLimit } from '@/shared/api';
import { useChannelId } from '@/shared/lib';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetLikedVideos = (params: PaginationLimit) => {
	const channelId = useChannelId();

	const { limit } = params;

	const query = useInfiniteQuery({
		queryKey: ['likedVideos', channelId, limit],

		queryFn: ({ pageParam = 1 }) => {
			return getLikedVideos({ channelId, page: pageParam, limit });
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
				?.flatMap(page => page.likedVideos)
				?.map(video => ({
					...video,
					createdAt: new Date(video?.createdAt),
				})),
		}),

		enabled: !!channelId,
	});

	return {
		likedVideos: query.data?.pages,
		...query,
	};
};
