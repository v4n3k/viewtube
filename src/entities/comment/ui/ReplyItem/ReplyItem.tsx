import { PATH_GENERATORS } from '@/app/routes';
import { formatDateAgo } from '@/entities/video/lib';
import { Avatar, ExpandableText, Link } from '@/shared/ui';
import clsx from 'clsx';
import { Reply } from '../../model/types';
import styles from './ReplyItem.module.css';

interface ReplyItemProps {
	reply: Reply;
}

export const ReplyItem = ({ reply }: ReplyItemProps) => {
	const { text, createdAt, channel } = reply;

	return (
		<li className={clsx(styles.replyItem)}>
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
		</li>
	);
};
