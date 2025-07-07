import { PATH_GENERATORS } from '@/app/routes';
import { formatDateAgo } from '@/entities/video/lib';
import { CreateReplyForm } from '@/features/createReply/ui';
import { RepliesList } from '@/features/getComments/ui';
import { useGetRepliesToComment } from '@/features/getRepliesToComment/model';
import { Avatar, Button, Link, Show } from '@/shared/ui';
import { memo, useEffect, useState } from 'react';
import { Comment, useCommentStore } from '../../model';
import styles from './CommentItem.module.css';

interface CommentItemProps {
	comment: Comment;
}

export const CommentItem = memo(({ comment }: CommentItemProps) => {
	const [isReplying, setIsReplying] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);

	const setParentCommentId = useCommentStore(state => state.setParentCommentId);
	const { text, repliesCount, createdAt, channel } = comment;

	const {
		repliesToComment,
		refetch,
		isLoading,
		isError,
		error,
	} = useGetRepliesToComment({
		commentId: comment.id,
	});

	const handleGetReplies = () => {
		setShowReplies(prev => !prev);
		refetch();
	};

	const handleAddReply = () => {
		setIsReplying(true);
		setParentCommentId(comment.id);
	};

	const handleRemoveReply = () => {
		setIsReplying(false);
		setParentCommentId(null);
	};

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
			return;
		}

		setShowReplies(true);
		refetch();
	}, [refetch]);

	return (
		<li className={styles.commentItem}>
			<div className={styles.container}>
				<Link href={PATH_GENERATORS.channel(channel.id)} hoverEffect='text'>
					<Avatar size='lg' />
				</Link>

				<div className={styles.content}>
					<div className={styles.header}>
						<Link href={PATH_GENERATORS.channel(channel.id)} hoverEffect='text'>
							{channel.name}
						</Link>
						<span className={styles.date}>{formatDateAgo(createdAt)}</span>
					</div>
					<p className={styles.text}>{text}</p>
				</div>
			</div>

			<div className={styles.actions}>
				<Button className={styles.replyButton} onClick={handleAddReply}>
					Reply
				</Button>
				<Show when={repliesCount}>
					<Button
						onClick={handleGetReplies}
						className={styles.replyButton}
						background='transparent'
					>
						{repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}
					</Button>
				</Show>
			</div>
			<Show when={showReplies && repliesToComment?.length}>
				<RepliesList
					replies={repliesToComment}
					isLoading={isLoading}
					isError={isError}
					error={error}
				/>
			</Show>

			<Show when={isReplying}>
				<CreateReplyForm onCancel={handleRemoveReply} />
			</Show>
		</li>
	);
});
