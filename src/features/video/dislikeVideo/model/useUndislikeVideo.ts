'use client';

import { undislikeVideo } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useUndislikeVideo = () => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => undislikeVideo({ channelId, videoId }),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['video', videoId] });
		},
	});

	return {
		undislikeVideo: () => mutation.mutate(),
		...mutation,
	};
};
