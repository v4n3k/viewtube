'use client';

import { getVideoById } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetVideo = () => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId);

	const query = useQuery({
		queryKey: ['video', channelId, videoId],

		queryFn: () => getVideoById({ channelId, videoId }),

		select: data => ({
			...data,
			createdAt: new Date(data.createdAt),
		}),

		enabled: !!videoId && !!channelId,
	});

	return { video: query.data, ...query };
};
