'use client';

import { deleteVideoFromWatchLater } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useUnsaveVideo = () => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return deleteVideoFromWatchLater({ channelId, videoId });
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['videos', videoId] });
		},
	});

	return {
		unsaveVideo: () => mutation.mutate(),
		...mutation,
	};
};
