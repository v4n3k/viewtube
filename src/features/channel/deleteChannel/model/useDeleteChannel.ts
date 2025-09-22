'use client';

import { deleteChannel as deleteChannelApi } from '@/entities/channel/api';
import { useUserId } from '@/shared/lib/useUserId';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDeleteChannel = () => {
	const queryClient = useQueryClient();
	const userId = useUserId();

	const mutation = useMutation({
		mutationFn: (channelId: number) => deleteChannelApi(channelId),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['myChannels', userId],
			});

			toast.success('Channel deleted successfully');
		},

		onError: () => {
			toast.error('Error deleting channel');
		},
	});

	return {
		deleteChannel: mutation.mutate,
		...mutation,
	};
};
