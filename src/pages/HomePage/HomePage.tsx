import { RecommendedVideosList } from '@/features/video/getRecommendedVideos';
import styles from './HomePage.module.css';

export const HomePage = () => {
	return (
		<div className={styles.page}>
			<RecommendedVideosList />
		</div>
	);
};
