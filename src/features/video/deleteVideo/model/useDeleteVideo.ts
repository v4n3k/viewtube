import { deleteVideo as deleteVideoApi } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDeleteVideo = () => {
	const channelId = useChannelId();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (videoId: number) => deleteVideoApi(videoId),

		onSuccess: () => {
			toast.success('Video deleted successfully!');
			queryClient.invalidateQueries({ queryKey: ['myVideos', channelId] });
		},
	});

	return { ...mutation, deleteVideo: mutation.mutate };
};
