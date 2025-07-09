'use client';

import { unlikeVideo } from '@/entities/video/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useUnlikeVideo = () => {
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return unlikeVideo(videoId);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['videos', videoId] });
		},
	});

	return {
		unlikeVideo: () => mutation.mutate(),
		...mutation,
	};
};
