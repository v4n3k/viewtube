import { RecommendedVideosList } from '@/features/video/getRecommendedVideos';
import { prefetchRecommendedVideos } from '@/features/video/getRecommendedVideos/model';
import { getQueryClient } from '@/shared/lib';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import styles from './HomePage.module.css';

export const HomePage = async () => {
	const queryClient = getQueryClient();

	await prefetchRecommendedVideos(queryClient);

	return (
		<div className={styles.homePage}>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<RecommendedVideosList />
			</HydrationBoundary>
		</div>
	);
};
