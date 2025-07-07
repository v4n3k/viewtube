'use client';

import { Comment } from '@/entities/comment/model';
import { ReplyItem } from '@/entities/comment/ui/ReplyItem/ReplyItem';
import { CircularLoader } from '@/shared/ui';
import styles from './RepliesList.module.css';

interface RepliesListProps {
	replies: Comment[] | undefined;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

export const RepliesList = ({
	replies,
	isLoading,
	isError,
	error,
}: RepliesListProps) => {
	if (isLoading) {
		return <CircularLoader paddingY='60px' />;
	}

	if (isError) {
		return <div>Error fetching replies: {error?.message}</div>;
	}

	return (
		<ul className={styles.repliesList}>
			{replies?.map(reply => (
				<ReplyItem key={reply.id} reply={reply} />
			))}
		</ul>
	);
};
