'use client';

import { CommentItem } from '@/entities/comment/ui';
import { CircularLoader, InfiniteScroll } from '@/shared/ui';
import { useGetComments } from '../../model';
import styles from './CommentsList.module.css';

export const CommentsList = () => {
	const {
		comments,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetComments({
		limit: 6,
	});

	if (isLoading) {
		return <CircularLoader paddingY='60px' />;
	}

	if (isError) {
		return <div>Ошибка загрузки комментариев: {error?.message}</div>;
	}

	return (
		<InfiniteScroll
			onFetchMore={fetchNextPage}
			hasMore={hasNextPage}
			isLoading={isFetchingNextPage}
		>
			<ul className={styles.commentsList}>
				{comments?.map(comment => (
					<CommentItem key={comment.id} comment={comment} />
				))}
			</ul>
		</InfiniteScroll>
	);
};
