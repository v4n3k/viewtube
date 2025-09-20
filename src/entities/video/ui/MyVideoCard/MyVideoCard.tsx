'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { formatDate, formatDuration, formatViews } from '@/entities/video/lib';
import { Button } from '@/shared/ui';
import { EditIcon, TrashIcon } from '@/shared/ui/icons';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { VideoWithoutChannel } from '../../model';
import styles from './MyVideoCard.module.css';

interface MyVideoCardProps {
	video: VideoWithoutChannel;
}

export const MyVideoCard = memo(({ video }: MyVideoCardProps) => {
	const router = useRouter();

	const {
		id,
		title,
		description,
		previewUrl,
		duration,
		createdAt,
		views,
		commentsCount,
	} = video;

	const handleCardClick = () => {
		router.push(PATH_GENERATORS.video(id));
	};

	const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		router.push(PATH_GENERATORS.editVideo(id));
	};

	const handleDeleteClick = () => {
		console.log('delete video'); // TODO: delete video
	};

	// TODO: add public / private toggle

	return (
		<li className={styles.myVideoCard} onClick={handleCardClick}>
			<div className={styles.previewContainer}>
				<img className={styles.preview} src={previewUrl} alt={title} />
				<span className={styles.duration}>{formatDuration(duration)}</span>
			</div>

			<div className={styles.titleAndDescription}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>
			</div>

			<div className={styles.stats}>
				<span>{formatDate(createdAt)}</span>
				<span>{formatViews(views)} views</span>
				<span>{commentsCount} comments</span>
			</div>

			<div className={styles.actions}>
				<Button variant='primary' fullWidth onClick={handleEditClick}>
					Edit <EditIcon />
				</Button>
				<Button
					background='outlined'
					variant='danger'
					onClick={handleDeleteClick}
				>
					Delete <TrashIcon />
				</Button>
			</div>
		</li>
	);
});
