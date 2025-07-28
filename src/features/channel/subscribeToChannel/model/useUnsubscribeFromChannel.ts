'use client';

import { unsubscribeFromChannel } from '@/entities/channel/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useUnsubscribeFromChannel = (unsubscribeFromChannelId: number) => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () =>
			unsubscribeFromChannel({
				subscriberChannelId: channelId,
				unsubscribeFromChannelId,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['video', channelId, videoId],
			});
		},
	});

	return {
		unsubscribeFromChannel: () => mutation.mutate(),
		...mutation,
	};
};
