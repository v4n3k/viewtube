import { RecommendedVideosList } from '@/features/getRecommendedVideos';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<RecommendedVideosList />
		</div>
	);
}
