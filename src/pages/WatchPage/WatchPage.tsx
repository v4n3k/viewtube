import { VideoPlayer } from '@/entities/video/ui';
import { CommentsSection } from '@/widgets/CommentsSection/ui';
import styles from './WatchPage.module.css';

export const WatchPage = () => {
	return (
		<div className={styles.page}>
			<VideoPlayer src='/video.mp4' />
			<CommentsSection />
		</div>
	);
};
