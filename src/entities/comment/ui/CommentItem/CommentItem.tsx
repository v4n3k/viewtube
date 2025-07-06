import { PATH_GENERATORS } from '@/app/routes';
import { formatDateAgo } from '@/entities/video/lib';
import { Avatar, Button, Link, Show } from '@/shared/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { Comment } from '../../model';
import { ReplyForm } from '../ReplyForm';
import styles from './CommentItem.module.css';

interface CommentWithRepliesCount extends Comment {
	repliesCount: number;
}

interface CommentItemProps {
	comment: CommentWithRepliesCount;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
	const [isReplying, setIsReplying] = useState(false);

	const { text, repliesCount, createdAt, channel } = comment;

	const handleAddReply = () => {
		setIsReplying(true);
		localStorage.setItem('parentCommentId', comment.id.toString());
	};

	const handleRemoveReply = () => {
		setIsReplying(false);
		localStorage.removeItem('parentCommentId');
	};

	return (
		<li className={clsx(styles.commentItem)}>
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
					<Button className={styles.replyButton} background='transparent'>
						{repliesCount} replies
					</Button>
				</Show>
			</div>

			<Show when={isReplying}>
				<ReplyForm onCancel={handleRemoveReply} onSuccess={handleRemoveReply} />
			</Show>
		</li>
	);
};
