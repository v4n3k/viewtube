import { SavedVideosList } from '@/features/video/getSavedVideos';
import styles from './SavedVideosPage.module.css';

export const SavedVideosPage = () => {
	return (
		<div className={styles.page}>
			<SavedVideosList />
		</div>
	);
};
