import { PATH_GENERATORS } from '@/app/routes';
import { formatDateAgo } from '@/entities/video/lib';
import { RepliesList, useGetRepliesToComment } from '@/features/comment';
import { CreateReplyForm } from '@/features/comment/createReply/ui';
import { Avatar, Button, ExpandableText, Link, Show } from '@/shared/ui';
import { ArrowDownIcon, ArrowUpIcon } from '@/shared/ui/icons';
import { useEffect, useState } from 'react';
import { Comment, useCommentStore } from '../../model';
import styles from './CommentItem.module.css';

interface CommentItemProps {
	comment: Comment;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
	const [isReplying, setIsReplying] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);

	const setParentCommentId = useCommentStore(state => state.setParentCommentId);

	const { id, text, repliesCount, createdAt, channel } = comment;

	const {
		repliesToComment,
		refetch,
		isLoading,
		isError,
		error,
	} = useGetRepliesToComment({
		commentId: id,
	});

	const handleGetReplies = () => {
		setShowReplies(prev => !prev);
		refetch();
	};

	const handleAddReply = () => {
		setIsReplying(true);
		setParentCommentId(id);
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
	}, [refetch, repliesCount]);

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
					<ExpandableText textClassName={styles.text}>{text}</ExpandableText>
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
						{repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}{' '}
						{showReplies ? <ArrowUpIcon /> : <ArrowDownIcon />}
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
};
