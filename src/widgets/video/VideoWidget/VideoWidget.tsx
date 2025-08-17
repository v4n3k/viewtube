'use client';

import { ChannelOverview } from '@/entities/channel/ui';
import { SubscribeToChannelButton } from '@/features/channel/subscribeToChannel';
import { useAddVideoToHistory } from '@/features/video/addVideoToHistory/model/useAddVideoToWatchLater';
import { DislikeButton } from '@/features/video/dislikeVideo';
import { useGetVideo } from '@/features/video/getVideo/model/useGetVideo';
import { LikeButton } from '@/features/video/likeVideo';
import { SaveButton } from '@/features/video/saveVideo';
import dynamic from 'next/dynamic';
import { VideoDetails } from '../VideoDetails';
import styles from './VideoWidget.module.css';

const VideoPlayer = dynamic(
	() =>
		import('@/entities/video/ui/VideoPlayer/VideoPlayer').then(
			mod => mod.VideoPlayer
		),
	{
		ssr: false,
		loading: () => <p>Loading video player...</p>,
	}
);

export const VideoWidget = () => {
	const { video } = useGetVideo();
	const { addVideoToHistory } = useAddVideoToHistory();

	if (!video) return;

	const { id: videoId, isLiked, isDisliked, isSaved, channel } = video;
	const {
		id: channelId,
		name,
		avatarUrl,
		subscribersCount,
		isSubscribed,
	} = channel;

	const handleAddVideoToHistory = () => {
		addVideoToHistory(videoId);
	};

	return (
		<div className={styles.videoWidget}>
			<VideoPlayer
				src='https://storage.yandexcloud.net/viewtube/videos/video.mp4'
				onWatch={handleAddVideoToHistory}
			/>

			<VideoDetails
				video={video}
				renderChannelOverview={() => (
					<ChannelOverview
						id={channelId}
						name={name}
						avatarUrl={avatarUrl}
						subscriptionsCount={subscribersCount}
						renderSubscriptionButton={() => (
							<SubscribeToChannelButton
								isSubscribed={isSubscribed}
								subscribedToChannelId={channelId}
							/>
						)}
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
