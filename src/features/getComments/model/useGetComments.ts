import { getComments } from '@/entities/comment/api';
import { PaginationLimit } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseGetCommentParams extends PaginationLimit {
	videoId: number;
}

export const useGetComments = (params: UseGetCommentParams) => {
	const { limit, videoId } = params;

	const query = useInfiniteQuery({
		queryKey: ['comments', limit],

		queryFn: async ({ pageParam = 1 }) => {
			return await getComments({ videoId, page: pageParam, limit });
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
			pages: data.pages.flatMap(page => page.comments),
		}),
	});

	return {
		comments: query.data?.pages,
		...query,
	};
};
