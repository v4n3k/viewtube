'use client';

import { unlikeVideo } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useUnlikeVideo = () => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => unlikeVideo({ channelId, videoId }),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['video', videoId] });
		},
	});

	return {
		unlikeVideo: () => mutation.mutate(),
		...mutation,
	};
};
