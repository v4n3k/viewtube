import { VideoPlayer } from '@/entities/video/ui';
import { LikeButton } from '@/features/video/likeVideo/ui/LikeButton/LikeButton';
import { CommentsSection } from '@/widgets/comment/CommentsSection/ui';
import styles from './WatchPage.module.css';

export const WatchPage = () => {
	return (
		<div className={styles.page}>
			<VideoPlayer src='/video.mp4' />
			<LikeButton isLiked={true} />
			<CommentsSection />
		</div>
	);
};
