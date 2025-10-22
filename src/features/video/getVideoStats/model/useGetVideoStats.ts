'use client';

import { getVideoStats, GetVideoStatsParams } from '@/entities/video/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetVideoStats = (
	params: Omit<GetVideoStatsParams, 'videoId'>
) => {
	const videoId = Number(useParams()?.videoId);

	const { startDate, endDate, type } = params;

	const query = useQuery({
		queryKey: ['videoStats', videoId, type, startDate, endDate],
		queryFn: () => getVideoStats({ videoId, ...params }),
		enabled: !!videoId && !!startDate && !!endDate && !!type,
		staleTime: 60 * 1000,
	});

	return { stats: query.data, ...query };
};
