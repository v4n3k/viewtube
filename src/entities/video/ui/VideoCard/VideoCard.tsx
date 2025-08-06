'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { Avatar, Link } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { formatDateAgo, formatDuration, formatViews } from '../../lib';
import { Video } from '../../model';
import styles from './VideoCard.module.css';

interface VideoCardProps {
	video: Video;
}

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
				<img
					className={styles.preview}
					src={
						'https://storage.yandexcloud.net/viewtube/images/uploaded-image.jpg'
					}
					alt={title}
				/>
				<span className={styles.duration}>{formatDuration(duration)}</span>
			</div>

			<div className={styles.videoDetails}>
				<Link
					className={styles.channelAvatarLink}
					href={PATH_GENERATORS.channel(channelId)}
					hoverEffect='text'
				>
					<Avatar src={''} />
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
