import { PATH_GENERATORS } from '@/app/routes';
import { formatDateAgo } from '@/entities/video/lib';
import { Avatar, Link } from '@/shared/ui';
import clsx from 'clsx';
import { Comment } from '../../model';
import styles from './CommentItem.module.css';

interface CommentItemProps {
	comment: Comment;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
	if (!comment?.id) return;

	const { text, createdAt, channel } = comment;

	return (
		<li className={clsx(styles.commentItem)}>
			<div className={styles.container}>
				<Link href={PATH_GENERATORS.channel(channel.id)} hoverEffect='text'>
					<Avatar />
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
		</li>
	);
};
