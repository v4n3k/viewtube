'use client';

import { subscribeToChannel } from '@/entities/channel/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useSubscribeToChannel = (subscribeToChannelId: number) => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () =>
			subscribeToChannel({
				subscriberChannelId: channelId,
				subscribeToChannelId,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['video', channelId, videoId],
			});
		},
	});

	return {
		subscribeToChannel: () => mutation.mutate(),
		...mutation,
	};
};
