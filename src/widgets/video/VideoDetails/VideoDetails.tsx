import { formatDateAgo } from '@/entities/video/lib';
import { Video } from '@/entities/video/model';
import { ExpandableText } from '@/shared/ui';
import { ReactNode } from 'react';
import styles from './VideoDetails.module.css';

interface VideoDetailsProps {
	video: Video;
	renderChannelOverview: () => ReactNode;
	renderVideoActions: () => ReactNode;
}

export const VideoDetails = ({
	video,
	renderChannelOverview,
	renderVideoActions,
}: VideoDetailsProps) => {
	const { title, description, views, createdAt } = video;

	return (
		<div className={styles.videoDetails}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.channelAndActions}>
				{renderChannelOverview()}
				<div className={styles.actionsContainer}>{renderVideoActions()}</div>
			</div>
			<div className={styles.descriptionWrapper}>
				<div className={styles.viewsAndDate}>
					<span>{views} views</span>
					<span>{formatDateAgo(createdAt)}</span>
				</div>
				<ExpandableText maxLines={2}>{description.repeat(10)}</ExpandableText>
			</div>
		</div>
	);
};
