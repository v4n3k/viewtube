'use client';

import { CreateCommentForm } from '@/features/createComment/ui';
import { CommentsList } from '@/features/getComments/ui';

export const CommentsSection = () => {
	return (
		<>
			<CreateCommentForm />
			<CommentsList />
		</>
	);
};
