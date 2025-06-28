'use client';

import { VideosList } from '@/entities/video/ui';
import { useGetRecommendedVideos } from '../model/useGetRecommendedVideos';

export const RecommendedVideosList = () => {
	const { recommendedVideos } = useGetRecommendedVideos({
		page: 1,
		limit: 100,
	});

	return <VideosList videos={recommendedVideos} />;
};
