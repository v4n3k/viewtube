'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { useThemeStore } from '@/shared/lib/theme';
import { Avatar, Link } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useExtractColors } from 'react-extract-colors';
import { formatDateAgo, formatDuration, formatViews } from '../../lib';
import { Video, VideoWithoutChannel } from '../../model';
import styles from './VideoCard.module.css';

interface VideoCardProps {
	video: Video | VideoWithoutChannel;
}

const hasChannelInfo = (video: Video | VideoWithoutChannel): video is Video => {
	return (
		'channelId' in video &&
		typeof video.channelId === 'number' &&
		'channelName' in video &&
		typeof video.channelName === 'string' &&
		'channelAvatar' in video &&
		typeof video.channelAvatar === 'string'
	);
};

export const VideoCard = memo(({ video }: VideoCardProps) => {
	const router = useRouter();
	const theme = useThemeStore(state => state.theme);

	const previewColors = useExtractColors(video.previewUrl, { format: 'rgb' });

	const { id, title, previewUrl, duration, views, createdAt } = video;

	const handleCardClick = () => {
		router.push(PATH_GENERATORS.video(id));
	};

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
	};

	const videoCardStyle = {
		'--hover-bg-color': previewColors.lighterColor || 'transparent',
		'--hover-bg-opacity': theme === 'dark' ? '0.5' : '0.4',

		'--hover-text-rgb': previewColors.lighterColor,
	} as React.CSSProperties;

	return (
		<li
			className={styles.videoCard}
			onClick={handleCardClick}
			style={videoCardStyle}
		>
			<div className={styles.previewContainer}>
				<img className={styles.preview} src={previewUrl} alt={title} />
				<span className={styles.duration}>{formatDuration(duration)}</span>
			</div>

			<div className={styles.videoDetails}>
				{hasChannelInfo(video) && (
					<Link
						className={styles.channelAvatarLink}
						hoverEffect='text'
						href={PATH_GENERATORS.channel(video.channelId)}
						onClick={handleLinkClick}
					>
						<Avatar src={video.channelAvatar} size='lg' />
					</Link>
				)}

				<div className={styles.videoInfo}>
					<h3 className={styles.title}>{title}</h3>

					{hasChannelInfo(video) && (
						<Link
							className={styles.channelName}
							hoverEffect='text'
							href={PATH_GENERATORS.channel(video.channelId)}
							onClick={handleLinkClick}
						>
							{video.channelName}
						</Link>
					)}

					<div className={styles.videoStats}>
						<span>{formatViews(views)} views</span> •{' '}
						<span>{formatDateAgo(createdAt)}</span>
					</div>
				</div>
			</div>
		</li>
	);
});
