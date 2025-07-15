import { Video } from '@/entities/video/model';
import { ChannelOverview } from '@/features/channel/getChannelOverview';
import { DislikeButton } from '@/features/video/dislikeVideo';
import { LikeButton } from '@/features/video/likeVideo';
import { SaveButton } from '@/features/video/saveVideo';
import styles from './VideoDetails.module.css';

interface VideoDetailsProps {
	video: Video;
}

export const VideoDetails = ({ video }: VideoDetailsProps) => {
	const { title, channel } = video;
	const { id, name, avatarUrl, subscriptionsCount } = channel;

	return (
		<div className={styles.videoDetails}>
			<h2>{title}</h2>
			<ChannelOverview
				id={id}
				name={name}
				avatarUrl={avatarUrl}
				subscriptionsCount={subscriptionsCount}
			/>
			<div className={styles.actions}>
				<LikeButton isLiked={false} />
				<DislikeButton isDisliked={true} />
				<SaveButton className={styles.saveButton} isSaved={true} />
			</div>
		</div>
	);
};
