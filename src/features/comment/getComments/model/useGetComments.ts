'use client';

import { getComments } from '@/entities/comment/api';
import { PAGINATION_LIMIT } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetComments = () => {
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const query = useInfiniteQuery({
		queryKey: ['comments', PAGINATION_LIMIT, videoId],

		enabled: !isNaN(videoId),

		queryFn: ({ pageParam = 1 }) => {
			return getComments({ videoId, page: pageParam, limit: PAGINATION_LIMIT });
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
				?.flatMap(page => page.comments)
				?.map(comment => ({
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
