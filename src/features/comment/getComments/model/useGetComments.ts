'use client';

import { getComments } from '@/entities/comment/api';
import { PaginationLimit } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface UseGetCommentParams extends PaginationLimit {}

export const useGetComments = (params: UseGetCommentParams) => {
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const { limit } = params;

	const query = useInfiniteQuery({
		queryKey: ['comments', limit, videoId],

		enabled: !isNaN(videoId),

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
			pages: data.pages
				.flatMap(page => page.comments)
				.map(comment => ({
					...comment,
					createdAt: new Date(comment.createdAt),
				})),
		}),
	});

	return {
		comments: query.data?.pages,
		...query,
	};
};
