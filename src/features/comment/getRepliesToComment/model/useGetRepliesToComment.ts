import { getRepliesToComment } from '@/entities/comment/api';
import { useQuery } from '@tanstack/react-query';

interface UseGetRepliesToCommentParams {
	commentId: number;
}

export const useGetRepliesToComment = ({
	commentId,
}: UseGetRepliesToCommentParams) => {
	const query = useQuery({
		queryKey: ['repliesToComment', commentId],

		queryFn: async () => {
			return await getRepliesToComment(commentId);
		},

		enabled: commentId !== null,

		select: data => {
			if (data) {
				return data.map(reply => ({
					...reply,
					createdAt: new Date(reply.createdAt),
				}));
			}
			return [];
		},
	});

	const refetchRepliesToComment = (commentId: number) => {
		query.refetch();
	};

	return {
		repliesToComment: query.data,
		refetchRepliesToComment,
		...query,
	};
};
