'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { createChannel as createChannelApi } from '@/entities/channel/api';
import { setChannelIdInStorage } from '@/shared/lib/useChannelId';
import { useUserId } from '@/shared/lib/useUserId';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useCreateChannel = () => {
	const router = useRouter();
	const userId = useUserId();

	const mutation = useMutation({
		mutationFn: (channel: FormData) => {
			channel.append('userId', String(userId));

			return createChannelApi(channel);
		},

		onSuccess: data => {
			setChannelIdInStorage(data.id);
			router.push(PATH_GENERATORS.channel(data.id));

			toast.success('Channel created successfully');
		},
	});

	return {
		createChannel: mutation.mutate,
		...mutation,
	};
};
