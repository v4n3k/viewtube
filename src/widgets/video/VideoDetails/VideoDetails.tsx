import { formatDateAgo } from '@/entities/video/lib';
import { Video } from '@/entities/video/model';
import { ChannelOverview } from '@/features/channel/getChannelOverview';
import { DislikeButton } from '@/features/video/dislikeVideo';
import { LikeButton } from '@/features/video/likeVideo';
import { SaveButton } from '@/features/video/saveVideo';
import { ExpandableText } from '@/shared/ui';
import styles from './VideoDetails.module.css';

interface VideoDetailsProps {
	video: Video;
}

export const VideoDetails = ({ video }: VideoDetailsProps) => {
	const {
		title,
		channel,
		isLiked,
		isDisliked,
		isSaved,
		description,
		views,
		createdAt,
	} = video;
	const { id, name, avatarUrl, subscriptionsCount } = channel ?? {};

	return (
		<div className={styles.videoDetails}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.channelAndActions}>
				<ChannelOverview
					id={id}
					name={name}
					avatarUrl={avatarUrl}
					subscriptionsCount={subscriptionsCount}
				/>
				<div className={styles.actions}>
					<LikeButton isLiked={isLiked} />
					<DislikeButton isDisliked={isDisliked} />
					<SaveButton className={styles.saveButton} isSaved={isSaved} />
				</div>
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
