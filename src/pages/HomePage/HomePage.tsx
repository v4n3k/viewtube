import { RecommendedVideosList } from '@/features/getRecommendedVideos';
import styles from './HomePage.module.css';

export const HomePage = () => {
	return (
		<div className={styles.page}>
			<RecommendedVideosList />
		</div>
	);
};
