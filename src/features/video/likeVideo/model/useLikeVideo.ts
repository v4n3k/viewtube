'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useLikeVideo = () => {
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return (() => new Promise(resolve => setTimeout(resolve, 1000)))();
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['videos', videoId] });
		},
	});

	return {
		likeVideo: () => mutation.mutate(),
		...mutation,
	};
};
