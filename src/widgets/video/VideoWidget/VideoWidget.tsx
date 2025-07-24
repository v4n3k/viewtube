import { VideoPlayer } from '@/entities/video/ui';
import { ChannelOverview } from '@/features/channel/getChannelOverview';
import { DislikeButton } from '@/features/video/dislikeVideo';
import { useGetVideo } from '@/features/video/getVideo/model/useGetVideo';
import { LikeButton } from '@/features/video/likeVideo';
import { SaveButton } from '@/features/video/saveVideo';
import { VideoDetails } from '../VideoDetails';
import styles from './VideoWidget.module.css';

export const VideoWidget = () => {
	const { video } = useGetVideo();

	if (!video) return;

	const { isLiked, isDisliked, isSaved, channel } = video;
	const { id, name, avatarUrl, subscriptionsCount } = channel ?? {};

	return (
		<div className={styles.videoWidget}>
			<VideoPlayer src='/video.mp4' />

			<VideoDetails
				video={video}
				renderChannelOverview={() => (
					<ChannelOverview
						id={id}
						name={name}
						avatarUrl={avatarUrl}
						subscriptionsCount={subscriptionsCount}
					/>
				)}
				renderVideoActions={() => (
					<>
						<LikeButton isLiked={isLiked} />
						<DislikeButton isDisliked={isDisliked} />
						<SaveButton isSaved={isSaved} />
					</>
				)}
			/>
		</div>
	);
};
