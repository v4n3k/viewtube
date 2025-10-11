'use client';

import { selectChannel as selectChannelApi } from '@/entities/channel/api';
import { setChannelIdInStorage } from '@/shared/lib/useChannelId';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useSelectChannel = () => {
	const mutation = useMutation({
		mutationFn: (selectedChannelId: number) => {
			return selectChannelApi(selectedChannelId);
		},

		onSuccess: data => {
			setChannelIdInStorage(data.id);
		},

		onError: () => {
			toast.error('Error selecting channel');
		},
	});

	return {
		selectChannel: mutation.mutateAsync,
		...mutation,
	};
};
