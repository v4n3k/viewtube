'use client';

import { VideoStatsChart } from '@/widgets/video';
import styles from './VideoStatisticsPage.module.css';

export const VideoStatisticsPage = () => {
	return (
		<div className={styles.page}>
			<VideoStatsChart metricType='view' />
			<VideoStatsChart metricType='like' />
			<VideoStatsChart metricType='dislike' />
		</div>
	);
};
