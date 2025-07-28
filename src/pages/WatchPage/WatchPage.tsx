import { CommentsSection } from '@/widgets/comment/CommentsSection/ui';
import { VideoWidget } from '@/widgets/video/VideoWidget/VideoWidget';
import styles from './WatchPage.module.css';

export const WatchPage = () => {
	return (
		<div className={styles.page}>
			<VideoWidget />
			<CommentsSection />
		</div>
	);
};
