'use client';

import { dislikeVideo } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useDislikeVideo = () => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => dislikeVideo({ channelId, videoId }),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['video', channelId, videoId],
			});
		},
	});

	return {
		dislikeVideo: () => mutation.mutate(),
		...mutation,
	};
};
