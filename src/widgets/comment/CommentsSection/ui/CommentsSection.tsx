'use client';

import { CreateCommentForm } from '@/features/comment/createComment/ui';
import { CommentsList } from '@/features/comment/getComments/ui';

export const CommentsSection = () => {
	return (
		<>
			<CreateCommentForm />
			<CommentsList />
		</>
	);
};
