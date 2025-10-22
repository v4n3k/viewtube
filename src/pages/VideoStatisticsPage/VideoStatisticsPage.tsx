'use client';

import { VideoStatsChart } from '@/widgets/video';
import styles from './VideoStatisticsPage.module.css';

export const VideoStatisticsPage = () => {
	return (
		<div className={styles.page}>
			<VideoStatsChart type='view' />
			<VideoStatsChart type='like' />
			<VideoStatsChart type='dislike' />
		</div>
	);
};
