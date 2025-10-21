'use client';

import {
	getvideoLikesStats,
	GetVideoLikesStatsParams,
} from '@/entities/video/api';
import { useQuery } from '@tanstack/react-query';

export const useGetVideoLikesStats = (params: GetVideoLikesStatsParams) => {
	const { videoId, startDate, endDate } = params;

	const query = useQuery({
		queryKey: ['videoLikesStats', videoId, startDate, endDate],
		queryFn: () => getvideoLikesStats(params),
		enabled: !!videoId && !!startDate && !!endDate,
		staleTime: 60 * 1000,
	});

	return { likesStats: query.data, ...query };
};
