'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { Link } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { formatDateAgo, formatDuration, formatViews } from '../../lib';
import { Video } from '../../model';
import styles from './VideoCard.module.css';

interface VideoCardProps {
	video: Video;
}

const imgPlaceholderUrl =
	'https://culturetrekking.com/images/img_NJ8iq1DB6tsS96NB1RvB7w/adobestock_386572510.jpeg?fit=outside&w=1600&h=1066';

export const VideoCard = memo(({ video }: VideoCardProps) => {
	const router = useRouter();

	const {
		id,
		title,
		previewUrl,
		duration,
		views,
		createdAt,
		channelId,
		channelName,
		channelAvatar,
	} = video;

	const handleClick = () => {
		router.push(PATH_GENERATORS.video(id));
	};

	return (
		<li className={styles.videoCard} onClick={handleClick}>
			<div className={styles.previewContainer}>
				<img className={styles.preview} src={imgPlaceholderUrl} alt={title} />
				<span className={styles.duration}>{formatDuration(duration)}</span>
			</div>

			<div className={styles.videoDetails}>
				<Link
					className={styles.channelAvatar}
					href={PATH_GENERATORS.channel(channelId)}
					hoverEffect='text'
				>
					<img src={imgPlaceholderUrl} alt={channelName} />
				</Link>

				<div className={styles.videoInfo}>
					<h3 className={styles.title}>{title}</h3>
					<Link
						className={styles.channelName}
						href={PATH_GENERATORS.channel(channelId)}
						hoverEffect='text'
					>
						{channelName}
					</Link>
					<div className={styles.videoStats}>
						<span>{formatViews(views)} views</span> •{' '}
						<span>{formatDateAgo(createdAt)}</span>
					</div>
				</div>
			</div>
		</li>
	);
});
