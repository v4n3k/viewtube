import { toggleVisibility as toggleVisibilityApi } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useToggleVisibility = () => {
	const channelId = useChannelId();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (videoId: number) =>
			toggleVisibilityApi({ channelId, videoId }),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myVideos', channelId] });
		},

		onError: () => {
			toast.error('Error changing visibility');
		},
	});

	return {
		toggleVisibility: mutation.mutate,
		...mutation,
	};
};
