'use client';

import { CommentItem } from '@/entities/comment/ui';
import { InfiniteScroll } from '@/shared/ui';
import { useParams } from 'next/navigation';
import { useGetComments } from '../../model';
import styles from './CommentsList.module.css';

export const CommentsList = () => {
	const params = useParams<{ videoId: string }>();
	const videoId = Number(params?.videoId);

	const {
		comments,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetComments({
		videoId,
		limit: 6,
	});

	if (isLoading) {
		return <div>Загрузка комментариев...</div>;
	}

	if (isError) {
		return <div>Ошибка загрузки комментариев: {error?.message}</div>;
	}

	return (
		<InfiniteScroll
			onLoadMore={fetchNextPage}
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
